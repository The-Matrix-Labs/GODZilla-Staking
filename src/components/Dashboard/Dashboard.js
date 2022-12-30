import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./dashboard.css";
import Slider from "@mui/material/Slider";
import { styled, useTheme } from "@mui/material/styles";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSigner, useProvider } from "wagmi";
import { pink } from "@mui/material/colors";
import { ethers } from "ethers";
import {
  KeyboardArrowUp,
  ContentCopy,
  KeyboardArrowDown,
  Info,
} from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();
  const data_hover =
    "Note - By doing emergency withdraw you will not recieve any reward also extra fees will be deducted.";
  const [stackeStyle, setstackeStyle] = useState("activeoption");
  const [unstakeStyle, setunstackeStyle] = useState("inactiveoption");

  const [box1_child_style, setbox1ChildStyle] = useState("box1-child");
  const [activeID, setActiveId] = useState(0);
  const [value, setValue] = React.useState(0);
  const [text, setText] = React.useState(
    "kjncjksnuh02830bi0x990w83bd8289yuhdieduh"
  );
  var sliderOptionsStyle = [
    "",
    "slider_custom_options-child",
    "slider_custom_options-child",
    "slider_custom_options-child",
    "slider_custom_options-child",
  ];
  // const { data: signer, isError, isLoading } = useSigner();
  // const provider = useProvider();
  // const [poolId, setPoolId] = useState(0);
  // const [poolInfo, setPoolInfo] = useState();
  // const [userInfo, setUserInfo] = useState();
  // const [walletAddressInfo, setWalletAddressInfo] = useState();
  // const [mystakebalance, setMystakeBalance] = useState(0);
  // const [amount, setAmount] = useState();
  // const [myaddress, setMyaddress] = useState();
  // const [locktime, setLockTime] = useState(1);
  // const [unlockTime, setUnlockTime] = useState(1);
  // const [emergencyfee, setEmergencyfee] = useState();
  // const [poolsize, setPoolSize] = useState();
  // const [maxpool, setMaxPool] = useState(0);
  // const [reward, setReward] = useState();
  // const [myTokenBalance, setMyTokenBalance] = useState(0);
  // const [istokenapproved, settokenapproved] = useState(false);
  // const [buttonactive1, setButtonactive1] = useState("activebutton");
  // const [buttonactive2, setButtonactive2] = useState("");
  // const [buttonactive3, setButtonactive3] = useState("");
  // const [buttonactive4, setButtonactive4] = useState("");
  // const [maxtoken, setMaxToken] = useState(0);
  // const [maxContribution, setMaxContribution] = useState(0);
  // const [minContribution, setMinContribution] = useState(0);
  // const [claimableTokens, setClaimableTokens] = useState(0);
  // const [errors, setError] = useState();
  // console.log(signer, provider);

  const [currencyID, setCurrencyID] = React.useState("0");
  const currencyList = ["GODZ", "USD", "EUR"];

  const handlestake = () => {
    setstackeStyle("activeoption");
    setunstackeStyle("inactiveoption");
  };

  const handleunstake = () => {
    setstackeStyle("inactiveoption");
    setunstackeStyle("activeoption");
  };

  const handleup = () => {
    setCurrencyID((currencyID + 1) % currencyList.length);
  };
  const handledown = () => {
    setCurrencyID((currencyID - 1 + currencyList.length) % currencyList.length);
  };

  const handleSliderChange = (ID) => {
    sliderOptionsStyle[activeID] = "slider_custom_options-child";
    setValue(ID * 25);
    setActiveId(ID);

    sliderOptionsStyle[activeID] = "slider_custom_options-child-active";
  };

  useEffect(() => {
    console.log(sliderOptionsStyle);
  }, [sliderOptionsStyle]);
  // async function getPoolInfo() {
  //   try {
  //     let rpcUrl = value.rpcURl;
  //     let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
  //     let stake_temp = new ethers.Contract(
  //       value.stakingAddress,
  //       stakingAbi,
  //       provider_
  //     );
  //     var _poolInfo = await stake_temp.poolInfo(poolId);
  //     console.log("Pool Info: ", _poolInfo);
  //     console.log("Emergency Fees: ", _poolInfo.emergencyFees.toString());
  //     const emergencywithdrawfee = await _poolInfo.emergencyFees.toString();
  //     const currrentpoolsize = await _poolInfo.currentPoolSize.toString();
  //     const maxcontribution = await _poolInfo.maxContribution.toString();
  //     const maxcontributionconverted =
  //       ethers.utils.formatEther(maxcontribution);
  //     const minicontribution = await _poolInfo.minContribution.toString();
  //     const minicontributionconverted =
  //       ethers.utils.formatEther(minicontribution);
  //     const currrentpoolsizeConverted = Math.floor(
  //       ethers.utils.formatEther(currrentpoolsize)
  //     );
  //     const maxpool = await _poolInfo.maxPoolSize.toString();
  //     const maxpoolConverted = ethers.utils.formatEther(maxpool);
  //     const lockDayss = await _poolInfo.lockDays.toString();
  //     setPoolInfo(_poolInfo);
  //     setMinContribution(minicontributionconverted);
  //     setEmergencyfee(emergencywithdrawfee);
  //     setPoolSize(currrentpoolsizeConverted);
  //     setLockTime(lockDayss);
  //     setMaxPool(maxpoolConverted);
  //     setMaxContribution(maxcontributionconverted);
  //     console.log("maxpool=>" + maxpoolConverted);
  //     console.log("current pools=>" + currrentpoolsizeConverted);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // }

  return (
    <div class="dashboard-root">
      <div class="title">GODZilla Staking Programme</div>
      <div class="box1">
        <div class={box1_child_style}>
          <div class="box1-title">You will stake: </div>
          <div class="currency">
            <div class="currencyValue">{currencyList[currencyID]}</div>
            <div class="currencyToggle">
              <KeyboardArrowUp
                class="currencyToggleOptions"
                onClick={handleup}
              />
              <KeyboardArrowDown
                class="currencyToggleOptions"
                onClick={handledown}
              />
            </div>
          </div>
        </div>
        <div class="copyContent">
          <div class="copyContentInfo">
            <div class="contractTilte">Farm Contact:</div>
            <div class="contractValue">{text}</div>
          </div>
          <button
            class="copyActionButton"
            onClick={() => {
              navigator.clipboard.writeText(text);
            }}
          >
            <ContentCopy />
          </button>
        </div>
      </div>
      <div className="flex-container">
        <div class="container">
          <div class="modal">
            <div class="options">
              <button class={stackeStyle} onClick={handlestake}>
                Stake
              </button>
              <button class={unstakeStyle} onClick={handleunstake}>
                Unstake
              </button>
            </div>
            <div class="info">
              <div class="info-child-left">Staking Period: 30 Days</div>
              <div class="info-child-right">Interest Rate: 9.02 PR</div>
            </div>
            <div>
              <input
                type="text"
                class="amount"
                placeholder="Enter amount (GODZ)"
              ></input>
            </div>

            <Slider
              aria-label="Volume"
              defaultValue={30}
              value={value}
              step={25}
              onChange={handleSliderChange}
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? " #07142D;"
                    : "rgba(231, 231, 231, 0.27)",
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  width: 24,
                  height: 24,
                  backgroundColor: " #07142D;",
                  "&:before": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
              }}
            />

            <div class="slider_custom_options">
              <button
                class={sliderOptionsStyle[1]}
                onClick={() => {
                  handleSliderChange(1);
                }}
              >
                25%
              </button>
              <button
                class={sliderOptionsStyle[2]}
                onClick={() => {
                  handleSliderChange(2);
                }}
              >
                50%
              </button>
              <button
                class={sliderOptionsStyle[3]}
                onClick={() => {
                  handleSliderChange(3);
                }}
              >
                75%
              </button>
              <button
                class={sliderOptionsStyle[4]}
                onClick={() => {
                  handleSliderChange(4);
                }}
              >
                100%
              </button>
            </div>

            <div class="info2">
              <div class="info-child2-left">Available</div>
              <div class="info-child2-right">100 GODZ</div>
            </div>

            <div class="action">
              <button class="actions-child"> Stake 0 GODZ</button>
            </div>
            <div class="action2">
              <button class="actions-child2"> Emergency Withdraw</button>
              <div class="hover-text">
                <Info class="info_icon" />
                <span class="tooltip-text" id="top">
                  {data_hover}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="container go-behind">
          <div class="modal">
            <div class="box3-title">
              <div class="box3-title-content">O GODZ staked</div>
            </div>
            <div class="inner2">
              <div class="d3">
                <h4 class="d3-child">9.02% APR</h4>
              </div>
              <div class="d4">
                <div class="stats-values">(0.032 GODZ/block)</div>
                <div class="stats-values">37,611,661.18 GODZ staked</div>
              </div>
            </div>
            <div class="footers">Reward</div>
            <hr class="hr" />
            <div class="d3">
              <h4 class="d3-child">Block: 24434343</h4>
            </div>
            <div class="d4">
              <div class="stats-values">[ est Jan 2, 2023, 13:18 ]</div>
            </div>
            <div class="footers">Expiration</div>
            <hr class="hr" />
            <div class="footers">EARNED</div>
            <hr class="hr" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
{
  /* <div class="container">
        <div class="modal">
          <p class="warning">
            <strong>
              This only works in the{" "}
              <a href="http://nightly.webkit.org/">Webkit Nightlies</a>!
            </strong>
          </p>
          <p>
            The background image should be pleasantly blurred under this box,{" "}
            <a href="https://i.imgur.com/z7s7uf6.png">like so</a>.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis,
            quae distinctio magnam, laborum iusto itaque autem! Molestiae enim
            distinctio molestias, dolores ea quasi magni nisi aspernatur magnam,
            voluptate eum fuga.
          </p>
        </div>
      </div> */
}
