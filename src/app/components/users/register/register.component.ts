import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(public router: Router, public authService: AuthService, public storage: AngularFireStorage) { }
  @ViewChild('imageUser') inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
  onAddUser() {
    this.authService.registerUser(this.email, this.password).then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
  }

  onLoginRedirect(): void {
    this.router.navigate(['']);
  }
}
