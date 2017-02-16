import { MtgleaguePage } from './app.po';

describe('mtgleague App', function() {
  let page: MtgleaguePage;

  beforeEach(() => {
    page = new MtgleaguePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
