import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoviesService } from '../servies/movies.service';
import { Component, OnInit } from '@angular/core';
import { Category, Movie } from '../../model/movie';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  allMovies: Movie[] = [];
  allCategories: Category[] = [];
  selFile: any = null;
  noMovies: string = '';
  imgPrefix: string = 'https://test-api.storexweb.com/';
  img_upload_Msg: string = '';
  url_upload_img: string | null | ArrayBuffer= '../../assets/imgs/upload.png';
  category_id_msg: boolean = false;
  movieId: number = 0;

  constructor(
    private _MoviesService: MoviesService,
    private  _ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  /* ********** Start ********** */
  AllMovies() {
    this._ActivatedRoute.data.subscribe((res)=>{
      if (res.movies != `No Movies`) {
        this.allMovies = res.movies.message;
      } else {
        this.toastr.error('No Movies Available Now', '', {
          positionClass: 'toast-top-right',
          timeOut: 2500,
        });
      }
    })
  }
  /* ********** End ********** */

  /* ********** Start ********** */
  AllCategories() {

    this._ActivatedRoute.data.subscribe((res)=>{
      if (res.category != `No Categories`) {
        this.allCategories = res.categories.message;
      } else {
        this.toastr.error('No Categories Available Now', '', {
          positionClass: 'toast-top-right',
          timeOut: 2500,
        });
      }
    })

    // this._CategoryService.getCategory().subscribe((res) => {
    //   this.allCategories = res.message;
    // });
  }
  /* ********** End ********** */

  /* ********** Start ********** */
  showMovByCategory(id: number) {
    this._MoviesService.getMoviesByCategory(id).subscribe((res) => {
      this.allMovies = res.message;
      if (this.allMovies.length == 0) {
        this.noMovies = `No movies`;
      }
    });
  }
  /* ********** End ********** */

  /* ********** Start Create Movie ********** */
  createMovieForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
  });

  checkCategoryId(event: any) {
    this.category_id_msg = true;
    let id = event.target.value;
    this.allCategories.forEach((ele) => {
      if (ele.id == id) {
        this.category_id_msg = false;
      }
    });
  }

  // Show upload file
  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.img_upload_Msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.img_upload_Msg = 'Only images are supported';
      return;
    }

    this.selFile = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.img_upload_Msg = '';
      this.url_upload_img = reader.result;
    };
  }

  CreateMovie() {
    if (this.selFile?.name) {
      const formData = new FormData();
      formData.append('name', this.createMovieForm.value.name);
      formData.append('category_id', this.createMovieForm.value.category_id);
      formData.append('image', this.selFile, this.selFile.name);
      formData.append('description', this.createMovieForm.value.description);

      this._MoviesService.createMovie(formData).subscribe((res) => {
        if (res.status == 'success') {
          this.toastr.success('Movie Added Successfully', '', {
            positionClass: 'toast-top-right',
            timeOut: 2500,
          });
          this.AllMovies();
        } else if (res.status == 'failed') {
          if (res.message.category_id) {
            this.toastr.error(res.message.category_id, '', {
              positionClass: 'toast-top-right',
              timeOut: 2500,
            });
          }
        }
        $('#CreateMovie').modal('hide');
        this.createMovieForm.reset();
      });
    } else {
      this.toastr.error('You must select an image', '', {
        positionClass: 'toast-top-right',
        timeOut: 2500,
      });
    }
  }

  /* ********** End Create ********** */

  /* ********** Edit Movie ********** */
  EditMovie: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
    _method: new FormControl('put', [Validators.required]),
    movie_id: new FormControl(null, [Validators.required]),
  });

  setValue(mov_id: number) {
    for (let index = 0; index < this.allMovies.length; index++) {
      if (this.allMovies[index].id == mov_id) {
        this.EditMovie.controls.movie_id.setValue(this.allMovies[index].id);
        this.EditMovie.controls.name.setValue(this.allMovies[index].name);
        /*this this line makes First Solution fire, without it second solution will fire */
        this.EditMovie.get('image')?.setValue(this.allMovies[index].image);
        /* End */

        this.url_upload_img = this.imgPrefix + this.allMovies[index].image;
        this.EditMovie.controls.category_id.setValue(
          this.allMovies[index].category_id
        );
        this.EditMovie.controls.description.setValue(
          this.allMovies[index].description
        );
      }
    }
  }

  editMovie() {
    /* First Solution */
    this._MoviesService
      .ediMovie(this.EditMovie.value, this.EditMovie.value.movie_id)
      .subscribe((res) => {
        if (res.status == 'success') {
          this.toastr.success('Movie Updated Successfully', '', {
            positionClass: 'toast-top-right',
            timeOut: 2500,
          });
          $('#EditMovie').modal('hide');
          this.AllMovies();
        }
      });
    /* End Solution */

    /* Second Solution */
    // if(this.selFile?.name){

    //   const formData = new FormData();

    //   this.movieId =  this.EditMovie.value.movie_id
    //   formData.append('name',this.EditMovie.value.name);
    //   formData.append('category_id',this.EditMovie.value.category_id);
    //   formData.append('image', this.selFile,this.selFile.name);
    //   formData.append('description',this.EditMovie.value.description);
    //   formData.append('_method',this.EditMovie.value._method);

    //   this._MoviesService.ediMovie(formData,this.movieId).subscribe((res)=>{
    //     if(res.status == 'success'){
    //       this.toastr.success('Movie Updated Successfully', '', {
    //         positionClass: 'toast-top-right',
    //         timeOut: 2500,
    //       });
    //       $('#EditMovie').modal('hide');
    //       this.AllMovies();
    //     }
    //   });
    // }
    // else{
    //     this.toastr.error('You must select an image', '', {
    //       positionClass: 'toast-top-right',
    //       timeOut: 2500,
    //     });
    // }
    /* End */
  }
  /* ********** End ********** */

  /* ********** Delete Movie ********** */
  deleteMovie(text: string, mov_cate_id: number) {
    let data = {
      _method: text,
    };

    this._MoviesService.delMovie(data, mov_cate_id).subscribe((res) => {
      console.log(res);
      if (res.status == 'success') {
        this.toastr.success('Movie Deleted Successfully', '', {
          positionClass: 'toast-top-right',
          timeOut: 2500,
        });
        this.AllMovies();
      }
    });
  }
  /* ********** End ********** */

  /* ********** Start ********** */
  categoryActive(event: any): void {
    $(event.target).addClass('categoryActive');
    $(event.target).siblings().removeClass('categoryActive');
  }
  /* ********** End ********** */

  ngOnInit(): void {
    this.AllMovies();
    this.AllCategories();
  }
}
