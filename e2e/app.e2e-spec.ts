import { TimeMyShowPage } from './app.po';

describe('time-my-show App', () => {
  let page: TimeMyShowPage;

  beforeEach(() => {
    page = new TimeMyShowPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
