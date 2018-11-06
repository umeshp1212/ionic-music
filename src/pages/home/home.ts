import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicsServiceProvider } from '../../providers/musics-service/musics-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicPlayerPage } from "../music-player/music-player";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic = [];
  constructor(public navCtrl: NavController, 
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    private musicProvider:MusicsServiceProvider, 
    public loadingController: LoadingController) {
   
       
  }

 ionViewDidLoad(){
   let allMusicloadingController = this.loadingController.create({
     content:"Music Loading..."
   });
   allMusicloadingController.present();
  this.musicProvider.getMusic()
    .subscribe((musicList) => 
        {
          allMusicloadingController.dismiss();
          this.allMusic = musicList
        });
 }

 shareSong(music){
   let shareSongActionSheet = this.actionSheetController.create({
     title:"Share Song",
     buttons:[
       {
         text:"Facebook", 
         icon:"logo-facebook",
         handler:()=>{
           this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url);
         }
       },
       { 
         text:"Twitter",
         icon:"logo-twitter",
         handler:()=>{
          this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url);
        }
       },
       {
         text:"Share",
         icon:"share",
         handler:()=> {
           this.socialSharing.share(music.name, "" ,music.image, music.music_url)
         }
       },
       {
         text:"Cancel",
         role:"destructive"
       }
     ]
   });
   shareSongActionSheet.present();
 }


 goToMusic(music){
   this.navCtrl.push(MusicPlayerPage, {
     music:music
   });
 }


}
