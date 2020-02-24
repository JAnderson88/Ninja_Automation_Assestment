import { Selector } from 'testcafe';
import APICalls from './APICalls';

const url = 'http://localhost:3001';

fixture('test1')
  .page(url)

// test('Check if API List is sorted and visible', async t => {
//   let APIDeviceList = await APICalls.getDevices();
//   let deviceOptionsBoxes = await Selector('.device-options');
//   let deviceNames = await Selector('.device-name');
//   let deviceTypes = await Selector('.device-type');
//   let deviceCapacities = await Selector('.device-capacity');
  
//   const sortedAPIList = []
  
//   for(let i=0; i<await deviceNames.count; i++){
//     const currentSnapshot = await deviceNames.nth(i)();
//     for(let j=0; j<await APIDeviceList.length; j++){
//       if(currentSnapshot.textContent === APIDeviceList[j].system_name){
//         sortedAPIList.push(APIDeviceList[j])
//         break;
//       }
//     }
//   }

//   for (let i = 0; i < await sortedAPIList.length; i++) {
//     const { system_name, type, hdd_capacity } = sortedAPIList[i];
//     await t
//       .expect(deviceNames.nth(i).withText(system_name).visible).ok()
//       .expect(deviceTypes.nth(i).withText(type).visible).ok()
//       .expect(deviceCapacities.nth(i).withText(hdd_capacity).visible).ok()
//       .expect(deviceOptionsBoxes.nth(i).find('a').visible).ok()
//       .expect(deviceOptionsBoxes.nth(i).find('button').visible).ok()
//   }
// });

test('Check if UI is being displayed properly', async t => {
  //Selectors
  let APIDeviceList = await APICalls.getDevices();
  let deviceMainBoxes = await Selector('.device-main-box');
  let listDevice = await Selector('.list-devices');
  let deviceInfoDiv = await Selector('.device-info');
  let deviceOptionsDiv = await Selector('.device-options');
  let deviceNames = await Selector('.device-name');
  let deviceTypes = await Selector('.device-type');
  let deviceCapacities = await Selector('.device-capacity');
  //Variables
  const listDeviceWidth = listDevice.getStyleProperty('width')
  const boxesCSSProps = [];
  const deviceInfoProps = [];
  const deviceOptionsProps = [];

  for(let i=0; i<deviceMainBoxes.count; i++){
    boxesCSSProps[i] = {}
    deviceInfoProps[i] = {}
    deviceOptionsProps[i] = {}

    boxesCSSProps[i].height = deviceMainBoxes.nth(i).getStyleProperty('height');
    boxesCSSProps[i].padding = deviceMainBoxes.nth(i).getStyleProperty('padding');
    boxesCSSProps[i].margin = deviceMainBoxes.nth(i).getStyleProperty('margin');
    boxesCSSProps[i].display = deviceMainBoxes.nth(i).getStyleProperty('display');
    boxesCSSProps[i].alignItems = deviceMainBoxes.nth(i).getStyleProperty('align-items');
    boxesCSSProps[i].justifyContent = deviceMainBoxes.nth(i).getStyleProperty('justify-content');

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
    .expect(deviceMainBoxes.count).eql(APIDeviceList.length)
  //check if the list devices div is exactly 700px
    .expect(listDeviceWidth).eql('700px')
  for(let i=0; i<deviceMainBoxes.count; i++){
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
      .expect(deviceNames.nth(i).visible).ok()
      .expect(deviceTypes.nth(i).visible).ok()
      .expect(deviceCapacities.nth(i).visible).ok()
  }
})

test('Test update route and change the first devices name', async t => {
  let oldAPIList = await APICalls.getDevices();
  let deviceNames = await Selector('.device-name');
  let firstUIDeviceType = await Selector('.device-type').nth(0);
  let firstUIDeviceCapacity = await Selector('.device-capacity').nth(0);

  let firstUIDeviceTypeSnapshot = await firstUIDeviceType();
  let firstUIDeviceCapacitySnapshot = await firstUIDeviceCapacity();
  
  if(firstUIDeviceTypeSnapshot.textContent === oldAPIList[0].type && firstUIDeviceCapacitySnapshot.textContent.substring(0,2) === oldAPIList[0].hdd_capacity) {
    await APICalls.updateDevices(oldAPIList[0].id, 'Renamed_Device', firstUIDeviceTypeSnapshot.textContent, firstUIDeviceCapacitySnapshot.textContent)
  }
  await t
    .eval(() => location.reload(true))
  await t
    .expect(deviceNames.nth(0).withText('Renamed_Device')).ok()
})

test('Test delete route and delete the last device in the list', async t => {
  let deviceNames = Selector('.device-name')
  let oldAPIList = await APICalls.getDevices();
  let oldAPIListlength = await oldAPIList.length
  let finalDeviceName = oldAPIList[oldAPIListlength - 1].system_name

  await APICalls.deleteDevice(oldAPIListlength-1)

  await t
    .eval(() => location.reload(true));

  if(await !deviceNames.withText(finalDeviceName).exists && await !deviceNames.withText(finalDeviceName).visble){
    return true
  }
})