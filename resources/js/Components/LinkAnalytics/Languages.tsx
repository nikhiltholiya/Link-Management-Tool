import BarChart from "../Charts/BarChart";

interface Language {
   code: string;
   name: string;
}

interface LanguageCount {
   [language: string]: number;
}

interface Props {
   analytics: any[];
   languages: any[];
   overview?: boolean;
}

const Languages = (props: Props) => {
   const { analytics, overview, languages } = props;

   const lanCodes: string[] = analytics.map(
      (item) => JSON.parse(item.languages)[1]
   );

   const languagesCounted: LanguageCount = lanCodes.reduce(
      (acc: LanguageCount, code: string) => {
         acc[code] = (acc[code] || 0) + 1;
         return acc;
      },
      {}
   );

   function getLanName(languages: Language[], code: string): string {
      let lan_name = "";
      for (const lan of languages) {
         if (lan.code === code) {
            lan_name = lan.name;
            break;
         }
      }
      return lan_name;
   }

   const languageNames: LanguageCount = {};
   Object.entries(languagesCounted).forEach(([key, value]) => {
      const lanName = getLanName(languages, key);
      languageNames[lanName] = value;
   });

   const newLangs: any[] = [];
   Object.entries(languageNames).forEach(([key, value]) => {
      newLangs.push({ x: key, y: value });
   });
   console.log(newLangs);

   return (
      <div className="card">
         <div className="p-6 pb-0">
            <h6>Languages</h6>
         </div>
         <BarChart
            data={Object.values(languageNames)}
            label={Object.keys(languageNames)}
         />
      </div>
   );
};

export default Languages;
