import { Injectable } from '@angular/core';
import { User} from './user.model';
import { Organ} from './organ.model';

import { HttpClient , HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Job } from './job.model';
import { University } from './university.model';
import { JobApply } from './jobapply.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public chaluKar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showTimer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private apiUrl = 'https://harshraj.pythonanywhere.com/user/api/get-question/?format=json';
  qns: any[];
  Candidate: boolean;
  Organization: boolean;
  University: boolean;
  Totalmarks: number;
  Marketing: number;
  Technical: number;
  startTimer: boolean;
  constructor(private http: HttpClient) { }

  checkForTimer(){
    if(this.startTimer === true)
      this.chaluKar.next(true);
  }

  getData() {
    return this.http.get(this.apiUrl);
  }

  getResult() {
    const body = {
      Technology: this.Technical,
      Marketing: this.Marketing,
      Total : this.Totalmarks
    };
    const reqheaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('https://harshraj.pythonanywhere.com/candidate/put-general-marks/' , body, {headers: reqheaders});
  }

  TechData() {
    return this.http.get('https://harshraj.pythonanywhere.com/user/api/get-domain-question/?Domain=1');
  }

  techResult() {
    const body = {
      Domain_final: this.Technical,
      Total : this.Totalmarks
    };
    const reqHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('https://harshraj.pythonanywhere.com/user/put-domain-marks/' , body, {headers: reqHeaders});
  }

  MarkData() {
    return this.http.get('https://harshraj.pythonanywhere.com/user/api/get-domain-question/?Domain=2');
  }
  levelone() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/organization/api/get-recomendedjob/?Level=1&fields=1', { headers: Headers });
  }

  leveltwo() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/organization/api/get-recomendedjob/?Level=2&field=1/', { headers: Headers } );
  }

  getJobs() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/organization/api/get-recomendedjob/', { headers: Headers });
  }

  getAllJobs() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/organization/list-of-job/', { headers: Headers } );
  }

  getSearchedJob(paramsObj){
    let params = new HttpParams({ fromObject: paramsObj });

    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/organization/list-of-job/', {params , headers: Headers} );
  }

  getRecommendedJobs(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    // const formData: FormData = new FormData();
    // formData.append('first', JSON.parse(sessionStorage.getItem("SD_1")));
    // formData.append('Second', JSON.parse(sessionStorage.getItem("SD_2")));
    // formData.append('third', JSON.parse(sessionStorage.getItem("SD_3")));
    // formData.append('fourth', JSON.parse(sessionStorage.getItem("SD_4")));


    const body = {
      first: parseInt(JSON.parse(sessionStorage.getItem("SD_1"))),
      Second: parseInt(JSON.parse(sessionStorage.getItem("SD_2"))),
      third: parseInt(JSON.parse(sessionStorage.getItem("SD_3"))),
      fourth: parseInt(JSON.parse(sessionStorage.getItem("SD_4"))),
    };

    return this.http.post('http://harshraj.pythonanywhere.com/organization/get-jobs', body, {headers: Headers});
  }

  orView() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/organization/create/', {headers: Headers} );
  }
  canView() {
    const Headers = new HttpHeaders().set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/candidate/create/', {headers: Headers} );
  }
  uniView() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/University/Uprofile/', {headers: Headers} );
  }

  jobView() {
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/organization/api/get-job/', {headers: Headers} );
  }


  markResult() {
    const body = {
      Domain_final: this.Marketing,
      Total : this.Totalmarks
    };
    const reqheaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('https://harshraj.pythonanywhere.com/user/put-domain-marks/' , body, {headers: reqheaders});
  }

  register(user: User) {
    const body: User = {
      username: user.username,
      email: user.email,
      password: user.password,
      confirm_password : user.confirm_password,
      Is_University: this.University,
      Is_Candidate: this.Candidate,
      Is_Organization: this.Organization

    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('https://harshraj.pythonanywhere.com/account/registration/', body, {headers : reqHeader});
  }


  userLogin(username, password) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const reqheaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    reqheaders.append('Authorization', 'Bearer');
    return this.http.post('https://harshraj.pythonanywhere.com/account/login/', data , { headers: reqheaders });
  }

  postFile(Name: string, Address: string ,  fileToUpload: File, Time: string, Familyincome: string, Residence, Bio: string, Experience: string) {
    const formData: FormData = new FormData();
    formData.append('Resume', fileToUpload, fileToUpload.name);
    formData.append('Name', Name);
    formData.append('Address', Address);
    // formData.append('Socialmedia', Socialmedia.toString());
    formData.append('Time', Time.toString());
    formData.append('Familyincome', Familyincome.toString());
    formData.append('Residence', Residence.toString());
    formData.append('Bio', Bio);
    formData.append('Experience', Experience.toString());



    if(localStorage.getItem("SM1")) 
      formData.append('Socialmedia', localStorage.getItem("SM1"))
    if(localStorage.getItem("SM2")) 
      formData.append('Socialmedia', localStorage.getItem("SM2"))
    if(localStorage.getItem("SM3")) 
      formData.append('Socialmedia', localStorage.getItem("SM3"))
    if(localStorage.getItem("SM4")) 
      formData.append('Socialmedia', localStorage.getItem("SM4"))
    if(localStorage.getItem("SM5")) 
      formData.append('Socialmedia', localStorage.getItem("SM5"))

    const Headers = new HttpHeaders().set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.post('https://harshraj.pythonanywhere.com/candidate/create/', formData, {headers: Headers});
  }


  createView(organ: Organ) {
    const info: Organ = {
      Name: organ.Name,
      Address: organ.Address,
      Email: organ.Email,
      City: organ.City,
      State: organ.State,
      Registration_no: organ.Registration_no,
      website: organ.website
    };
    const Headers = new HttpHeaders({'Content-Type': 'application/json'})
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.post('https://harshraj.pythonanywhere.com/organization/create/', info, {headers: Headers});
  }

  createuniView(university: University) {
    const info: University = {
      Name: university.Name,
      Address: university.Address,
      Website: university.Website,
      Conteact_no: university.Conteact_no,
      Type: university.Type,
      University: university.University,
      AICTE_college_code: university.AICTE_college_code,
      Email: university.Email

    };
    const Headers = new HttpHeaders({'Content-Type': 'application/json'})
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.post('https://harshraj.pythonanywhere.com/University/Uprofile/', info, {headers: Headers});
  }

  jobview(job: Job) {
    const data: Job = {
      job_title: job.job_title,
      Job_Descreption: job.Job_Descreption,
      Level: job.Level,
      Minimum_experience: job.Minimum_experience,
      prefered_city: job.prefered_city,
      fields: job.fields,
      id: job.id
    };
    const Headers = new HttpHeaders({'Content-Type': 'application/json'})
    .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.post('https://harshraj.pythonanywhere.com/organization/api/get-job/', data, {headers: Headers});
  }

  jobapply(jb: JobApply) {
    const data: JobApply = {
      proposal: jb.proposal
    };
    const Headers = new HttpHeaders({'Content-Type': 'application/json'})
    .set('Authorization', 'token ' + localStorage.getItem('token'));
    // tslint:disable-next-line: max-line-length
    return this.http.post('https://harshraj.pythonanywhere.com/candidate/apply/' + localStorage.getItem('id') + '/', data, { headers: Headers});
  }

  getAppliedJobs(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/candidate/get-application', {headers: Headers} );
  }

  viewAppliedCandidateList(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.get('https://harshraj.pythonanywhere.com/organization/application-list/' + localStorage.getItem('id'), {headers: Headers} );
  }

  getSubDomainQuestions(){
    let url = "https://harshraj.pythonanywhere.com/user/level3/" + sessionStorage.getItem('SD_1') + "/" + sessionStorage.getItem('SD_2')

    return this.http.get(url);
  }

  postTechRating(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

      const body = {
        TechRating: sessionStorage.getItem("Final_Tech_Rating")
      };

      return this.http.post('https://harshraj.pythonanywhere.com/candidate/put-ratingT/', body, { headers: Headers});
      
  }

  postMarketingRating(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

      const body = {
        MarketRating: sessionStorage.getItem("Final_Marketing_Rating")
      };

      return this.http.post('https://harshraj.pythonanywhere.com/candidate/put-ratingM/', body, { headers: Headers});
  }

  getRecommendedCourses(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    return this.http.get('https://harshraj.pythonanywhere.com/content/Recommended-courses/', {headers: Headers} );
  }

  getAllCourses(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    return this.http.get('https://harshraj.pythonanywhere.com/content/course-search', {headers: Headers} );
  }

  getAllBlogs(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    return this.http.get('https://harshraj.pythonanywhere.com/content/blogs-search', {headers: Headers} );
  }

  getAllSchemes(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    return this.http.get('https://harshraj.pythonanywhere.com/content/scheme-search', {headers: Headers} );
  }


  uploadCertificate(Name: string, certificate: File){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    const formData: FormData = new FormData();
    formData.append('Name', Name);
    formData.append('File', certificate, certificate.name);

    return this.http.post('https://harshraj.pythonanywhere.com/candidate/Certificate/', formData, {headers: Headers});

  }

  resumeAnalysis(Resume: File){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    const formData: FormData = new FormData();
    formData.append('username', localStorage.getItem("uname"));
    formData.append('Resume', Resume, Resume.name);

    return this.http.post('http://sihml.pythonanywhere.com/analysis/analysis/', formData, {headers: Headers});
  }

  deactivateProfile(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    return this.http.get('http://harshraj.pythonanywhere.com/account/deactivate/', {headers: Headers});
  }
  // postAllMarks(){
  //   const body = {
  //     Roundone: sessionStorage.getItem("Final_Marketing_Rating")
  //   };
  // }

  getUserProfile(){
    const Headers = new HttpHeaders()
      .set('Authorization', 'token ' + localStorage.getItem('token'));

    return this.http.get('https://harshraj.pythonanywhere.com/candidate/create/', {headers: Headers});
  }

  updateUserProfile(Name: string, Address: string ,  fileToUpload: File, Time: string, Familyincome: string, Residence, Bio: string, Experience: string){
    const formData: FormData = new FormData();
    formData.append('Resume', fileToUpload, fileToUpload.name);
    formData.append('Name', Name);
    formData.append('Address', Address);
    // formData.append('Socialmedia', Socialmedia.toString());
    formData.append('Time', Time.toString());
    formData.append('Familyincome', Familyincome.toString());
    formData.append('Residence', Residence.toString());
    formData.append('Bio', Bio);
    formData.append('Experience', Experience.toString());



    if(localStorage.getItem("SM1")) 
      formData.append('Socialmedia', localStorage.getItem("SM1"))
    if(localStorage.getItem("SM2")) 
      formData.append('Socialmedia', localStorage.getItem("SM2"))
    if(localStorage.getItem("SM3")) 
      formData.append('Socialmedia', localStorage.getItem("SM3"))
    if(localStorage.getItem("SM4")) 
      formData.append('Socialmedia', localStorage.getItem("SM4"))
    if(localStorage.getItem("SM5")) 
      formData.append('Socialmedia', localStorage.getItem("SM5"))

    const Headers = new HttpHeaders().set('Authorization', 'token ' + localStorage.getItem('token'));
    return this.http.put('https://harshraj.pythonanywhere.com/candidate/create/', formData, {headers: Headers});
  }



}

