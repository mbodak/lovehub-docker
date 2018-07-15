import { MatchingController } from './matching.controller';
import {MatchingServiceComponent} from './matching.service';

describe('matching.controller', function() {

  it('root get', () => {

    const matchingController = new MatchingController(new MatchingServiceComponent());

    expect(matchingController.matching()).toEqual([{
      image: 'https://media.gettyimages.com/photos/young-boy-in-a-park-picture-id499760879?b=1&k=6&m=499760879&s=612x612&w=0&h=nUALHJt25IR8yXbpNq4rQi24pUmN8ipjxxdOu2pIckE=',
      name: 'John Doe',
      description: 'Some example text some example text. John Doe is an architect and engineer'
    }]);
  });
});
