const ZKLib = require('./zklib')

const test = async () => {
// may not need a communication key or pass !!!!!!.
  let zkInstance = new ZKLib('10.10.1.26', 4370, 10000, 4000,123);
  
  try {
    // Create socket to the machine
    await zkInstance.createSocket();

    // Fetch users
    console.log('Fetching users...');
    const users = await zkInstance.getUsers();
    console.log('Users:', users);

    console.log('Fetching attendance logs...');
    const logs = await zkInstance.getAttendances();
    console.log('Attendance Logs:', logs);

    zkInstance.getRealTimeLogs((data) => {
        console.log('Real-time log:', data);
    });

    // console.log('Clearing attendance logs...');
    // await zkInstance.clearAttendanceLog();

  } catch (error) {
    console.error('Error:', error);
  } finally {
  
    try {
      console.log('Disconnecting from device...');
      await zkInstance.disconnect();
      console.log('Disconnected successfully.');
    } catch (disconnectError) {
      console.error('Error while disconnecting:', disconnectError);
    }
  }
};

test();
