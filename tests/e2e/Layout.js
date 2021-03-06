import { Selector } from 'testcafe';

import LayoutPO from './page-objects/Layout';

const Layout = new LayoutPO();

fixture('Layout').page(process.env.MP_URL);

test('Conditional layout parts are working: questions, feedback, one-column layout', async t => {
  await t.click(Selector('a').withText(Layout.txt.contact));

  await t.expect(Layout.Sidebar.count).eql(0);
  await t.expect(Layout.Feedback.count).eql(0);
  await t.expect(Layout.Questions.count).eql(0);
});

test('Navigation is expanding both serverside and clientside', async t => {
  await t.navigateTo('/api-reference/liquid/introduction');

  await t.expect(Selector('.nav-sidebar .active a').withText('Liquid').exists).ok();
  await t.expect(Selector('.nav-sidebar .submenu .active').withText('Introduction').exists).ok();
});

test('Breadcrumbs are showing up', async t => {
  await t.navigateTo('/api-reference/liquid/introduction');

  await t.expect(Selector('.breadcrumbs a').withText('Documentation').exists).ok();
  await t.expect(Selector('.breadcrumbs a').withText('API Reference').exists).ok();
  await t.expect(Selector('.breadcrumbs a').withText('Introduction').exists).ok();
});
