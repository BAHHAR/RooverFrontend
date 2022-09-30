import { DatePicker, Select } from "antd";
import moment from "moment";
import "moment/locale/fr";
import locale from "antd/es/date-picker/locale/fr_FR";
import { useEffect, useState } from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

interface props {
  onChange: (values: state) => any;
  hideCommercial?: boolean;
}
interface state {
  date: Date[];
  zone: string;
  commercial: string;
}
const SearchHeader = ({ onChange, hideCommercial }: props) => {
  const [search, setSearch] = useState<state>({
    date: [],
    zone: "",
    commercial: "",
  });
  const handleTopSearch = (name: string, data: any) =>
    setSearch({ ...search, [name]: data });
  useEffect(() => {
    onChange(search);
  }, [search]);
  return (
    <div className="row">
      <div className="col-12 ">
        <div className="component  py-3 px-5 d-flex justify-content-end">
          <div className="w-210  mr-3">
            <RangePicker
              className="input__form"
              locale={locale}
              onChange={(v) =>
                setSearch({
                  ...search,
                  date: v ? [moment(v[0]).toDate(), moment(v[1]).toDate()] : [],
                })
              }
            />
          </div>
          <div className="w-210 ">
            <Select
              className="input__form "
              placeholder="Zone"
              allowClear
              onChange={(v) => handleTopSearch("zone", v)}
            >
              
            </Select>
          </div>
          {!hideCommercial && (
            <div className="w-210  ml-3">
              <Select
                className="input__form "
                placeholder="Comerciaux"
                allowClear
                onChange={(v) => handleTopSearch("commercial", v)}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  String(option?.children)
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                
              </Select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
