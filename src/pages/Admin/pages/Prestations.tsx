import React ,{useState}from 'react'
import MySpin from "../../../components/Ui/Spin";
import MyBreadcrumb from "../../../components/Ui/MyBreadcrumb";
import PrestationsTable from '../../../components/tables/PrestationsTable';
import { PrestationApi } from '../../../store/apis/Prestations';
import AddPrestations from '../../../components/forms/AddPrestations';
function Prestations() {
    const [ToggleModal, setToggleModal] = useState(false)
    const OpenModal = () => {
      setToggleModal(!ToggleModal);
    };
    const {data,isLoading}=PrestationApi.useGetAllQuery()
    const prestationCategory=PrestationApi.useGetCategoriesQuery()?.data
    if(isLoading)return <MySpin/>
    return(
    <div>
    <MyBreadcrumb link={{ link: "/Presations", title: "Prestations" }} />
    <button
          className="btn__primary"
          onClick={OpenModal}
        >
          Ajouter
        </button>
    <PrestationsTable prestations={data?.prestations!}/>
    {
          ToggleModal && (
            //@ts-ignore
            <AddPrestations prestationsCategorie={prestationCategory?.prestations} toggleModal={ToggleModal} settoggleModal={OpenModal}/>
          )
        }
  </div>
  )
}

export default Prestations