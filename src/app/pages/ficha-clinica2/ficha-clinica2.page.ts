import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Timestamp } from 'firebase-firestore-timestamp';
import { FichaClinicaService, fichaClinica } from '../../services/ficha-clinica.service';
import { AuthenticateService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ficha-clinica2',
  templateUrl: './ficha-clinica2.page.html',
  styleUrls: ['./ficha-clinica2.page.scss'],
})
export class FichaClinica2Page implements OnInit {

  public fichaClinica: fichaClinica = {
    nombre: ' ',
    edad: 0,
    ocupacion: ' ',
    ayudasTecnicas: ' ',
    actividadDeportiva: ' ',
    fecha: ' ',
    intervencionesQX: ' ',
    traumas: ' ',
    ocupacionActualTrabajo: ' ',
    antecedentes: ' ',
    habitos: ' ',
    medicamentos: ' ',
    objetivos: ' ',
    userid: ' ',
    formid: ' ',
    dir: ' ',
  };

  userName: string;
  userLastName: string;


  fechaToday;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private fichaClinicaServ: FichaClinicaService,
    private userServ: UserService,
    private db: AngularFirestore,
    private router: Router,
    public alertController: AlertController
  ) { }

  async ngOnInit() {
    this.fechaToday = Date.now();
    this.fichaClinica.fecha = this.fechaToday;

    if (this.authService.userDetails()) {

      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();

      this.fichaClinica.nombre = this.userServ.getName();


      var Snombre = [];
      var Sedad = [];
      var Socupacion = [];
      var SayudasTecnicas = [];
      var SactividadDeportiva = [];
      var Sfecha = [];
      var SintervencionesQX = [];
      var Straumas = [];
      var SocupacionActualTrabajo = [];
      var Santecedentes = [];
      var Shabitos = [];
      var Smedicamentos = [];
      var Sobjetivos = [];
      var Suserid = [];
      var Sformid = [];
      let Sdir = [];

      var docRef = this.db.collection("fichas-clinicas").doc(this.userServ.getUID());

      await docRef.get().toPromise().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          Snombre = Snombre.concat(doc.data().nombre);
          Sedad = Sedad.concat(doc.data().edad);
          Socupacion = Socupacion.concat(doc.data().ocupacion);
          SayudasTecnicas = SayudasTecnicas.concat(doc.data().ayudasTecnicas);
          SactividadDeportiva = SactividadDeportiva.concat(doc.data().actividadDeportiva);
          Sfecha = Sfecha.concat(doc.data().fecha);
          SintervencionesQX = SintervencionesQX.concat(doc.data().intervencionesQX);
          Straumas = Straumas.concat(doc.data().traumas);
          SocupacionActualTrabajo = SocupacionActualTrabajo.concat(doc.data().ocupacionActualTrabajo);
          Santecedentes = Santecedentes.concat(doc.data().antecedentes);
          Shabitos = Shabitos.concat(doc.data().habitos);
          Smedicamentos = Smedicamentos.concat(doc.data().medicamentos);
          Sobjetivos = Sobjetivos.concat(doc.data().objetivos);
          Suserid = Suserid.concat(doc.data().userid);
          Sformid = Sformid.concat(doc.data().formid);
          Sdir = Sdir.concat(doc.data().dir);
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

      let SSnombre = Snombre.toString();
      let SSedad = Number(Sedad.toString());
      let SSocupacion = Socupacion.toString();
      let SSayudasTecnicas = SayudasTecnicas.toString();
      let SSactividadDeporiva = SactividadDeportiva.toString();
      let SSfecha = Sfecha.toString();
      let SSintervencionesQX = SintervencionesQX.toString();
      let SStraumas = Straumas.toString();
      let SSocupacionActualTRabajo = SocupacionActualTrabajo.toString();
      let SSantecedentes = Santecedentes.toString();
      let SShabitos = Shabitos.toString();
      let SSmedicamentos = Smedicamentos.toString();
      let SSobjetivos = Sobjetivos.toString();
      let SSuserid = Suserid.toString();
      let SSformid = Sformid.toString();
      let SSdir = Sdir.toString();

      this.fichaClinica.nombre = SSnombre;
      this.fichaClinica.edad = SSedad;
      this.fichaClinica.ocupacion = SSocupacion;
      this.fichaClinica.ayudasTecnicas = SSayudasTecnicas;
      this.fichaClinica.actividadDeportiva = SSactividadDeporiva;
      if (this.fichaClinica.fecha === '') {
        this.fichaClinica.fecha = Date.now();
      }
      else {
        this.fichaClinica.fecha = SSfecha;
      }
      this.fichaClinica.intervencionesQX = SSintervencionesQX;
      this.fichaClinica.traumas = SStraumas;
      this.fichaClinica.ocupacionActualTrabajo = SSocupacionActualTRabajo;
      this.fichaClinica.antecedentes = SSantecedentes;
      this.fichaClinica.habitos = SShabitos;
      this.fichaClinica.medicamentos = SSmedicamentos;
      this.fichaClinica.objetivos = SSobjetivos;
      this.fichaClinica.userid = SSuserid;
      this.fichaClinica.formid = SSformid;
      this.fichaClinica.dir = SSdir;


    } else {
      this.navCtrl.navigateBack('');
    }
  }

  async ionViewDidEnter() {

    this.fechaToday = Date.now();

    if (this.fichaClinica.fecha === '') {
      this.fichaClinica.fecha = Date.now();
    }

    if (this.authService.userDetails()) {

      this.userName = this.userServ.getName();
      this.userLastName = this.userServ.getLastName();

      this.fichaClinica.nombre = this.userServ.getName();

      console.log(this.userServ);

      var Snombre = [];
      var Sedad = [];
      var Socupacion = [];
      var SayudasTecnicas = [];
      var SactividadDeportiva = [];
      var Sfecha = [];
      var SintervencionesQX = [];
      var Straumas = [];
      var SocupacionActualTrabajo = [];
      var Santecedentes = [];
      var Shabitos = [];
      var Smedicamentos = [];
      var Sobjetivos = [];
      var Suserid = [];
      var Sformid = [];
      let Sdir = [];

      var docRef = this.db.collection("fichas-clinicas").doc(this.userServ.getUID());

      await docRef.get().toPromise().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          Snombre = Snombre.concat(doc.data().nombre);
          Sedad = Sedad.concat(doc.data().edad);
          Socupacion = Socupacion.concat(doc.data().ocupacion);
          SayudasTecnicas = SayudasTecnicas.concat(doc.data().ayudasTecnicas);
          SactividadDeportiva = SactividadDeportiva.concat(doc.data().actividadDeportiva);
          Sfecha = Sfecha.concat(doc.data().fecha);
          SintervencionesQX = SintervencionesQX.concat(doc.data().intervencionesQX);
          Straumas = Straumas.concat(doc.data().traumas);
          SocupacionActualTrabajo = SocupacionActualTrabajo.concat(doc.data().ocupacionActualTrabajo);
          Santecedentes = Santecedentes.concat(doc.data().antecedentes);
          Shabitos = Shabitos.concat(doc.data().habitos);
          Smedicamentos = Smedicamentos.concat(doc.data().medicamentos);
          Sobjetivos = Sobjetivos.concat(doc.data().objetivos);
          Suserid = Suserid.concat(doc.data().userid);
          Sformid = Sformid.concat(doc.data().formid);
          Sdir = Sdir.concat(doc.data().dir);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
      // this.fichaClinicaServ.setFicha();
      // this.fichaClinicaServ.getFichaID(this.userServ.getUID());

      let SSnombre = Snombre.toString();
      let SSedad = Number(Sedad.toString());
      let SSocupacion = Socupacion.toString();
      let SSayudasTecnicas = SayudasTecnicas.toString();
      let SSactividadDeporiva = SactividadDeportiva.toString();
      let SSfecha = Sfecha.toString();
      let SSintervencionesQX = SintervencionesQX.toString();
      let SStraumas = Straumas.toString();
      let SSocupacionActualTRabajo = SocupacionActualTrabajo.toString();
      let SSantecedentes = Santecedentes.toString();
      let SShabitos = Shabitos.toString();
      let SSmedicamentos = Smedicamentos.toString();
      let SSobjetivos = Sobjetivos.toString();
      let SSuserid = Suserid.toString();
      let SSformid = Sformid.toString();
      let SSdir = Sdir.toString();

      this.fichaClinica.nombre = SSnombre;
      this.fichaClinica.edad = SSedad;
      this.fichaClinica.ocupacion = SSocupacion;
      this.fichaClinica.ayudasTecnicas = SSayudasTecnicas;
      this.fichaClinica.actividadDeportiva = SSactividadDeporiva;
      if (this.fichaClinica.fecha === '') {
        this.fichaClinica.fecha = Date.now();
      }
      else {
        this.fichaClinica.fecha = SSfecha;
      }
      this.fichaClinica.intervencionesQX = SSintervencionesQX;
      this.fichaClinica.traumas = SStraumas;
      this.fichaClinica.ocupacionActualTrabajo = SSocupacionActualTRabajo;
      this.fichaClinica.antecedentes = SSantecedentes;
      this.fichaClinica.habitos = SShabitos;
      this.fichaClinica.medicamentos = SSmedicamentos;
      this.fichaClinica.objetivos = SSobjetivos;
      this.fichaClinica.userid = SSuserid;
      this.fichaClinica.formid = SSformid;
      this.fichaClinica.dir = SSdir;

      console.log(SSnombre);
      console.log(SSayudasTecnicas);

    } else {
      this.navCtrl.navigateBack('');
    }

  }

  goBack() {
      this.navCtrl.navigateBack('/tabs/perfil');
  }

}
