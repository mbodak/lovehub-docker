import { Controller, Get } from '@nestjs/common';

@Controller('api/home')
export class HomepageController {

  @Get('reasons')
  getReasons() {
    return [
      {
        image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title:'Lorem impum',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer '
      },
      {
        image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title:'Lorem impum',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title:'Lorem impum',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title:'Lorem impum',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer '
      },
      {
        image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title:'Lorem impum',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        image:'https://maxcdn.icons8.com/app/uploads/2017/05/Like-500.png',
        title:'Lorem impum',
        text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ];
  }

  @Get('feedbacks')
  getFeedbacks(){
    return [
      {
        image:'https://www.w3schools.com/bootstrap4/la.jpg',
        title:'Los Angeles',
        text:'We had such a great time in LA!',
        info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      },
      {
        image:'https://www.w3schools.com/bootstrap4/chicago.jpg',
        title:'Chicago',
        text:'Thank you, Chicago!',
        info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      
      },
      {
        image:'https://www.w3schools.com/bootstrap4/ny.jpg',
        title:'New York',
        text:'We love the Big Apple!',
        info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
      },
    ];
  }

  @Get('slider')
  getSlider(){
    return [
      {
        image:'https://www.w3schools.com/bootstrap4/la.jpg',
        title:'Los Angeles',
        text:'We had such a great time in LA!'
      },
      {
        image:'https://www.w3schools.com/bootstrap4/chicago.jpg',
        title:'Chicago',
        text:'Thank you, Chicago!'
      },
      {
        image:'https://www.w3schools.com/bootstrap4/ny.jpg',
        title:'New York',
        text:'We love the Big Apple!'
      },
    ];
  }
}
