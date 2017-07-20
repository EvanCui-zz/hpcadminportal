import { HpcPortalPage } from './app.po';

describe('hpc-portal App', () => {
  let page: HpcPortalPage;

  beforeEach(() => {
    page = new HpcPortalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
