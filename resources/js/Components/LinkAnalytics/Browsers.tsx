import DonutChart from "../Charts/DonutChart";

interface BrowserCount {
   [browser: string]: number;
}

interface Props {
   analytics: any[];
   overview?: boolean;
}

const Browsers = (props: Props) => {
   const { analytics, overview } = props;
   const browsers: string[] = analytics.map((item) => item.browser);

   const browserCounted: BrowserCount = browsers.reduce(
      (acc: BrowserCount, browser: string) => {
         acc[browser] = (acc[browser] || 0) + 1;
         return acc;
      },
      {}
   );

   return (
      <div className="card">
         <div className="p-6 pb-0">
            <h6>Browsers</h6>
         </div>
         <DonutChart
            data={Object.values(browserCounted)}
            label={Object.keys(browserCounted)}
         />
      </div>
   );
};

export default Browsers;
