import BarChart from "../Charts/BarChart";

interface DeviceCount {
   [device: string]: number;
}

interface Props {
   analytics: any[];
   overview?: boolean;
}

const Devices = (props: Props) => {
   const { analytics, overview } = props;
   const devices: string[] = analytics.map((item) => item.device);

   const deviceCounted: DeviceCount = devices.reduce(
      (acc: DeviceCount, device: string) => {
         acc[device] = (acc[device] || 0) + 1;
         return acc;
      },
      {}
   );

   return (
      <div className="card">
         <div className="p-6 pb-0">
            <h6>Devices</h6>
         </div>
         <BarChart
            data={Object.values(deviceCounted)}
            label={Object.keys(deviceCounted)}
         />
      </div>
   );
};

export default Devices;
