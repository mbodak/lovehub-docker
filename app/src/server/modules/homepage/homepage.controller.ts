import { Controller, Get } from '@nestjs/common';

@Controller('api/home')
export class HomepageController {

  @Get('reasons')
  getReasons() {
    return [
      {
        image:'https://d30y9cdsu7xlg0.cloudfront.net/png/196302-200.png',
        title:'Don’t leave anything blank.',
        text:'A big mistake a lot of people make while putting their profile together, is not taking advantage of all the tools they have to show who they are.'
      },
      {
        image:'https://png.icons8.com/ios/1600/camera.png',
        title:'Have a mix of photos',
        text:'People with a full-body photos, sports outfit, an outdoors or vacation/travel photo get more incoming messages'
      },
      {
        image:'http://www.free-icons-download.net/images/talk-bubble-logo-icon-64647.png',
        title:'Make it easy for people to talk to you.',
        text:'Often after you’ve matched with someone, they’ll check out your profile to try and come up with something to say. '
      },
      {
        image:'https://d30y9cdsu7xlg0.cloudfront.net/png/107561-200.png',
        title:'Be honest. People LOVE it.',
        text:'“Be open and honest about who are and what you want,”explained one dating site member. '
      },
      {
        image:'https://png.icons8.com/metro/1600/view-details.png',
        title:'Add details',
        text:'Instead of saying you love hiking, tell people your favorite hike. Instead of saying you like movies, tell them your favorite movie.'
      },
      {
        image:'http://cdn.onlinewebfonts.com/svg/img_297326.png',
        title:'Be your wonderful, weird self',
        text:'Whether you love grandma sweaters, tell corny dad jokes, or have read ever Harry Potter book over ten times, let people know. The oddball things about you, are what makes you who you are.'
      },
    ];
  }

  @Get('feedbacks')
  getFeedbacks(){
    return [
      {
        image:'https://www.w3schools.com/bootstrap4/la.jpg',
        title:'Matching',
        text:'Really like it!',
        info: 'Well-designed and fun matchmaking service. The most important features like messaging and viewing other profiles are free.'
      },
      {
        image:'https://www.w3schools.com/bootstrap4/chicago.jpg',
        title:'Friends',
        text:'Friends',
        info: 'I`m happy! Here I found so much interesting people who are my friends now'

      },
      {
        image:'https://www.w3schools.com/bootstrap4/ny.jpg',
        title:'Matching',
        text:'Matching',
        info: 'Nice features: likes and matching allows me to communicate with other only in twoside way'
      },
    ];
  }

  @Get('slider')
  getSlider(){
    return [
      {
        image:'http://www.nextmashup.com/wp-content/uploads/2016/05/Discos-In-Delhi.jpg',
        title:'Party',
        text:''
      },
      {
        image:'https://image.gala.de/21565476/uncropped-0-0/2c8e59e15b2fb78331464f76fbc003ef/eP/date.jpg',
        title:'Relationship',
        text:''
      },
      {
        image:'https://statusmaza.com/wp-content/uploads/2018/01/Love-And-Friendship.jpg',
        title:'Friendship',
        text:''
      }
    ];
  }
}
