import React from "react";

interface props {
  totalVisites: number;
  totalVisitesByGroup: { total: number; type: string }[];
  traitementAffairesPercentage: number;
}

function SuiviCommercialStatistics({
  totalVisites,
  totalVisitesByGroup,
  traitementAffairesPercentage,
}: props) {

  return (
    <div>
      <div className=" statistics">
        <div className="statistic__card ">
          <h5 className="statistic__card__title">Visites</h5>
          <h3 className="text-center">{totalVisites}</h3>
        </div>
        <div className="statistic__card ">
          {totalVisitesByGroup &&
            totalVisitesByGroup.map((v) => (
              <div
                className="d-flex align-items-center justify-content-between"
                key={v.type}
              >
                <h6 className="statistic__card__title">{v.type}</h6>
                <h5 className="text-center">{v.total}</h5>
              </div>
            ))}
        </div>

        <div className="statistic__card ">
          <h5 className="statistic__card__title">Traitement affaires</h5>
          <h3 className="text-center">{`${traitementAffairesPercentage}%`}</h3>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SuiviCommercialStatistics);
