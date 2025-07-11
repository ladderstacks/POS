import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { currencySymbolHandling } from "../sharedMethod";

const Widget = (props) => {
    const {
        title,
        value,
        currency,
        icon,
        className,
        iconClass,
        onClick,
        allConfigData,
    } = props;

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {currency} {value}
        </Tooltip>
    );

    return (
        <div className="col-xxl-3 col-xl-4 col-sm-6 widget" onClick={onClick}>
            <div
                className={`${className} shadow-md my-3 py-3 px-3 rounded d-flex align-items-center justify-content-between my-3`}
            >
                <div
                    className={`${iconClass} widget-icon rounded-10 d-flex align-items-center justify-content-center`}
                >
                    {icon}
                </div>
                <div className="text-end text-white">
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <h2 className="fs-1-xxl fw-bolder text-white">
                            {currencySymbolHandling(
                                allConfigData,
                                currency,
                                value,
                                true
                            )}
                        </h2>
                    </OverlayTrigger>
                    <h3 className="mb-0 fs-4 fw-light">{title}</h3>
                </div>
            </div>
        </div>
    );
};
export default Widget;
