/* globals angular, chai */
const assert = chai.assert;

describe('image components', function() {
  let $httpBackend = null;
  let imageService = null;

  beforeEach(angular.mock.module('services', {apiUrl: '/api'}));

  beforeEach(angular.mock.inject( (_imageService_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    imageService = _imageService_;
  }));

  afterEach(() => {
    //make sure $httpBackend.flush() has actually completed tasks
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('images service GETs all images', done => {
    const images = [1,2,3,4];

    $httpBackend
      .expectGet('/api/images')
      //mock response that will get set on the
      //.data property of $http response object
      .respond(images);

    imageService.getAll()
      .then(allImages => {
        assert.deepEqual(allImages, images);
        done();
      })
      .catch(done);
      //tell $httpBackend that everything is ready and
      //.flush() will initiate the response
    $httpBackend.flush();
  });

  it('images service POST new movie', done => {
    const newImage = {title: 'My Dog', url: 'http://someUrl.com', description: 'Description!'};
    const mockReturnObject = {_v: 0, title: 'My Dog', url: 'http://someUrl.com', description: 'Description!'};

    $httpBackend
      .expectPOST('/api/images', newImage)
      .respond(mockReturnObject);

    imageService.add(newImage)
      .then(addedImage => {
        assert.deepEqual(addedImage, mockReturnObject);
        done();
      })
      .catch(done);

    $httpBackend.flush();
  });

});
