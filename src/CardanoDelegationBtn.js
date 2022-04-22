import React, { useState } from "react";
import CardanoWalletsApi, { findWallet } from "./utils/cardano-wallets-api";
import "./CardanoDelegationBtn.css";

export const DelegateButton = ( { btnText, poolId, tagTx, blockfrostKey, walletName, WASM_lib = null, callBackFunc = null} ) => {    
    const [isLoading, setIsLoading] = useState(false)

    const handleCustomAPI = async () => {     
        try {
          setIsLoading(true);
          const wallet_obj = window.cardano;
          if (wallet_obj) {
            const compatible = await findWallet(walletName, wallet_obj);
            const wallet = await CardanoWalletsApi(
              compatible,
              blockfrostKey,
              WASM_lib
            );         
            const resp = await wallet.delegate({
              poolId: poolId,
              metadata: tagTx,
              metadataLabel: "721",
            });
            // tx hash
            console.dir(resp);
            //Exito
          } else {
            console.log("no wallet detected");
            // NO WALLET          
          }
        } catch (error) {
          // ERROR
         console.log(error) 
        }
        setIsLoading(false);        
    };

    return (
        <>          
          <button type="button" onClick={handleCustomAPI}>
            {btnText}
          </button>          
          {isLoading ? (
            <div className="pos-center" id="loader_dapp">
              <div className="loader" />
              <h3 style={{text_align:"center"}}> Building Transaction </h3>
            </div>
          ) : null}
        </>
      )    
}