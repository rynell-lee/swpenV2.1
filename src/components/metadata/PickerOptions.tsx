import metadataOptions from "../../jsons/MetadataOptions.json";
import PickerSelect from "./Picker";

const pickerOptions = (
  option: any,
  category?: any,
  length?: any,
  type?: any
) => {
  const options = [];
  const md: any = metadataOptions;
  if (option == 1) {
    options.push(metadataOptions.option1.category);
    options.push(metadataOptions.option1.poolLength);
    options.push(metadataOptions.option1.type);
    return options;
  } else if (option == 2) {
    if (category === "Individual") {
      options.push(metadataOptions.option2.gender.slice(0, -1));
    } else {
      options.push(metadataOptions.option2.gender);
    }
    options.push([
      "Event",
      ...Object.keys(
        md.option2.event[length.toLowerCase()][category.toLowerCase()]
      ),
    ]);
    options.push(metadataOptions.option2.stroke);
    if (type == "Competition") {
      options.push(metadataOptions.option2.round);
    }
    return options;
  } else if ((option = 3)) {
    options.push(["Pool Length", "25M", "50M"]);
    options.push(["Distance", "50M", "100M", "200M", "400M", "800M", "1500M"]);
    return options;
  }
};

//condition to display picker or not
const displayPicker = (condition: any, option: any, index: any, obj: any) => {
  // console.log(obj);
  return condition == true ? (
    <PickerSelect options={option} number={1} key={index} obj={obj} />
  ) : null;
};

export { pickerOptions, displayPicker };
