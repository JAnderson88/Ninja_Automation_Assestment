import { Selector } from 'testcafe';
import getAPIDeviceList from './getAPIDeviceList';

const url = 'http://localhost:3001';

fixture('test1')
  .page(url)

test('test1', async t => {
  let list = await getAPIDeviceList();
  let boxes = await Selector('.device-options');
  let names = await Selector('.device-name');
  let types = await Selector('.device-type');
  let capacities = await Selector('.device-capacity');
  for (let i = 0; i < list.length; i++) {
    const { system_name, type, hdd_capacity } = list[i];
    await t
      .expect(names.nth(i).withText(system_name)).ok()
      .expect(types.nth(i).withText(type)).ok()
      .expect(capacities.nth(i).withText(hdd_capacity)).ok()
      .expect(boxes.nth(i).find('a').visible).ok()
      .expect(boxes.nth(i).find('button').visible).ok()
  }
});

test('test2', async t => {
  
})