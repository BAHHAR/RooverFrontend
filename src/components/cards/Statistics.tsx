import React from "react";

interface props {
  totalClient: number;
  totalVentes: number;
  totalAffaireTraite: number;
  totalAffaireChaude: number;
  totalVolumeAffaireChaudes:number;
  nbr_Portefeuilles:number;
  VolumePortfeuille:number;
  VolumeVentes:number
}
function Statistics({
  totalClient,
  totalVentes,
  nbr_Portefeuilles,
  totalAffaireChaude,
  totalVolumeAffaireChaudes,
  VolumePortfeuille,
  VolumeVentes
}: props) {
  return (
    <div>
      <div className=" statistics">
        <div className="statistic__card ">
          <h5 className="statistic__card__title">Clients</h5>
          <h3 className="text-center">{totalClient}</h3>
        </div>
        <div className="statistic__card">
          <div className="d-flex align-items-center justify-content-between">
              <h5 className="statistic__card__title">Nombre affaires chaudes </h5>
              <h5 className="text-center">{totalAffaireChaude}</h5>
          </div>
          <div className="d-flex align-items-center justify-content-between">
              <h5 className="statistic__card__title">Volume affaires chaudes </h5>
              <h5 className="text-center">{totalVolumeAffaireChaudes}</h5>
          </div>
          <div className="d-flex align-items-center justify-content-between">
              <h5 className="statistic__card__title">Nombre de portefeuilles </h5>
              <h5 className="text-center">{nbr_Portefeuilles}</h5>
          </div>
          <div className="d-flex align-items-center justify-content-between">
              <h5 className="statistic__card__title">Volume de portefeuilles </h5>
              <h5 className="text-center">{VolumePortfeuille}</h5>
          </div>
        </div>
        {/* <div className="statistic__card ">
          <h6 className="statistic__card__title">Nombre affaires chaudes </h6>
          <h3 className="text-center">{totalAffaireChaude}</h3>
        </div>
        <div className="statistic__card ">
          <h6 className="statistic__card__title">Volume affaires chaudes </h6>
          <h3 className="text-center">{totalVolumeAffaireChaudes}</h3>
        </div>
        <div className="statistic__card ">
          <h6 className="statistic__card__title">Nombre de portefeuilles </h6>
          <h3 className="text-center">{nbr_Portefeuilles}</h3>
        </div> */}
        
        <div className="statistic__card">
          <div className="d-flex align-items-center justify-content-between">
              <h5 className="statistic__card__title">Volume de vente </h5>
              <h5 className="text-center">{VolumeVentes}</h5>
          </div>
        <div className="d-flex align-items-center justify-content-between">
              <h5 className="statistic__card__title">Ventes </h5>
              <h5 className="text-center">{totalVentes}</h5>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default React.memo(Statistics);
