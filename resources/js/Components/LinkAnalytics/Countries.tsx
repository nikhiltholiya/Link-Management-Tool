import BarChart from "../Charts/BarChart";

interface CountryCount {
   [country: string]: number;
}

interface Props {
   analytics: any[];
   overview?: boolean;
}
const Countries = (props: Props) => {
   const { analytics, overview } = props;

   const countries: string[] = [];
   analytics.forEach((item: any) => {
      const country = JSON.parse(item.ip).countryName;
      countries.push(country);
   });

   const countryCounted: CountryCount = countries.reduce(
      (acc: CountryCount, country: string) => {
         acc[country] = (acc[country] || 0) + 1;
         return acc;
      },
      {}
   );

   return (
      <div className="card">
         <div className="p-6 pb-0">
            <h6>Countries</h6>
         </div>
         <BarChart
            data={Object.values(countryCounted)}
            label={Object.keys(countryCounted)}
         />
      </div>
   );
};

export default Countries;
