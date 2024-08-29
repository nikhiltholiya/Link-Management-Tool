import BarChart from "../Charts/BarChart";

interface DeviceCount {
   [device: string]: number;
}

interface Props {
   analytics: any[];
   overview?: boolean;
}

const Operating = (props: Props) => {
   const { analytics, overview } = props;
   const operatingSystems: string[] = analytics.map((item) => item.platform);

   const osCounted: DeviceCount = operatingSystems.reduce(
      (acc: DeviceCount, device: string) => {
         acc[device] = (acc[device] || 0) + 1;
         return acc;
      },
      {}
   );

   return (
      <div className="card">
         <div className="p-6 pb-0">
            <h6>Operating Systems</h6>
         </div>
         <BarChart
            data={Object.values(osCounted)}
            label={Object.keys(osCounted)}
         />
      </div>
   );
};

export default Operating;
