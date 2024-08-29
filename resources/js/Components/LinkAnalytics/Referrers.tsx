import DonutChart from "../Charts/DonutChart";

interface RefererCount {
   Refer: number;
   Direct: number;
}

interface Props {
   analytics: any[];
}

const Referrers = (props: Props) => {
   const { analytics } = props;
   const referers: string[] = analytics.map((item) => item.referer);

   const refererCounted: RefererCount = referers.reduce(
      (acc: RefererCount, referer: string) => {
         if (referer) {
            acc.Refer++;
         } else {
            acc.Direct++;
         }
         return acc;
      },
      { Refer: 0, Direct: 0 }
   );

   return (
      <div className="card">
         <div className="p-6 pb-0">
            <h6>Referrers</h6>
         </div>
         <DonutChart
            data={Object.values(refererCounted)}
            label={Object.keys(refererCounted)}
         />
      </div>
   );
};

export default Referrers;
