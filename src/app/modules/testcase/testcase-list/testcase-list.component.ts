import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FetchServiceService } from 'src/app/core/services/fetch-service.service';
import { FireStoreService } from 'src/app/core/services/firebaseAPI.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { FactScrollerComponent } from 'src/app/shared/controls/fact-scroller/fact-scroller.component';
import { CollectionType } from 'src/app/shared/enums/collectiontype.enum';
import Swal from 'sweetalert2'
import * as firebase from 'firebase';

@Component({
  selector: 'app-testcase-list',
  templateUrl: './testcase-list.component.html',
  styleUrls: ['./testcase-list.component.css']
})
export class TestcaseListComponent implements OnInit {

  dataSource: FactScrollerComponent;
  constructor(private factService: FetchServiceService,
    private afs: AngularFirestore,
    private notifyService: NotifyService,
    public fs: FireStoreService,) {
    this.dataSource = new FactScrollerComponent(factService, CollectionType.Testcase);
   }

  ngOnInit(): void {
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "It will delete all the existing mapped test cases also",
      showCancelButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      confirmButtonColor: '#9c27b0',
      cancelButtonColor: '#999',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const tcDocRef = this.afs.collection(CollectionType.Testcase).doc(id).ref;
        var statsRef = this.afs.collection(CollectionType.Testcase).doc('--stats--').ref;    
        const decrement = firebase.firestore.FieldValue.increment(-1);
        const batch = this.afs.firestore.batch();

        batch.delete(tcDocRef);
        batch.update(statsRef,{counter: decrement})

        batch.commit().then(()=>{
          this.dataSource.makeFilter(null);
          this.notifyService.notifySuccess("Testcase deleted successfully.");
        })
        .catch(error => this.notifyService.notifyError(error));
      }
    })
  }

}
