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
  let list = await getAPIDeviceList();
  let boxes = await Selector('.device-main-box');
  let listDevice = await Selector('.list-devices');
  let deviceInfoDiv = await Selector('.device-info');
  let deviceOptionsDiv = await Selector('.device-options');
  let names = await Selector('.device-name');
  let types = await Selector('.device-type');
  let capacities = await Selector('.device-capacity');

  const listDeviceWidth = listDevice.getStyleProperty('width')
  const boxesCSSProps = [];
  const deviceInfoProps = [];
  const deviceOptionsProps = [];

  for(let i=0; i<boxes.count; i++){
    boxesCSSProps[i] = {}
    deviceInfoProps[i] = {}
    deviceOptionsProps[i] = {}

    boxesCSSProps[i].height = boxes.nth(i).getStyleProperty('height');
    boxesCSSProps[i].padding = boxes.nth(i).getStyleProperty('padding');
    boxesCSSProps[i].margin = boxes.nth(i).getStyleProperty('margin');
    boxesCSSProps[i].display = boxes.nth(i).getStyleProperty('display');
    boxesCSSProps[i].alignItems = boxes.nth(i).getStyleProperty('align-items');
    boxesCSSProps[i].justifyContent = boxes.nth(i).getStyleProperty('justify-content');

    deviceInfoProps[i].display = deviceInfoDiv.nth(i).getStyleProperty('display');
    deviceInfoProps[i].flex = deviceInfoDiv.nth(i).getStyleProperty('flex');
    deviceInfoProps[i].flexDirection = deviceInfoDiv.nth(i).getStyleProperty('flex-direction');
    deviceInfoProps[i].fontFamily = deviceInfoDiv.nth(i).getStyleProperty('font-family');
    deviceInfoProps[i].justifyContent = deviceInfoDiv.nth(i).getStyleProperty('justify-content');
    deviceInfoProps[i].textAlign = deviceInfoDiv.nth(i).getStyleProperty('text-align');
    deviceInfoProps[i].fontWeight = deviceInfoDiv.nth(i).getStyleProperty('font-weight');

    deviceOptionsProps[i].textAlign = deviceOptionsDiv.nth(i).getStyleProperty('text-align');
    deviceOptionsProps[i].flex = deviceOptionsDiv.nth(i).getStyleProperty('flex');

  }

  await t
  //check if list is the same size as the devices options list
    .expect(boxes.count).eql(list.length)
  //check if the list devices div is exactly 700px
    .expect(listDeviceWidth).eql('700px')
  //
  for(let i=0; i<boxes.count; i++){
    await t
      .expect(boxesCSSProps[i].height).eql('70px')
      .expect(boxesCSSProps[i].padding).eql('5px 10px')
      .expect(boxesCSSProps[i].margin).eql('5px 0')
      .expect(boxesCSSProps[i].display).eql('flex')
      .expect(boxesCSSProps[i].alignItems).eql('center')
      .expect(boxesCSSProps[i].justifyContent).eql('space-around')
      .expect(deviceInfoProps[i].display).eql('flex')
      .expect(deviceInfoProps[i].flex).eql('1 1')
      .expect(deviceInfoProps[i].flexDirection).eql('column')
      .expect(deviceInfoProps[i].fontFamily).eql('monospace')
      .expect(deviceInfoProps[i].justifyContent).eql('left')
      .expect(deviceInfoProps[i].textAlign).eql('left')
      .expect(deviceInfoProps[i].fontWeight).eql('bold')
      .expect(deviceOptionsProps[i].textAlign).eql('right')
      .expect(deviceOptionsProps[i].flex).eql('2 1')
      .expect(names.nth(i).visible).ok()
      .expect(types.nth(i).visible).ok()
      .expect(capacities.nth(i).visible).ok()
  }
})