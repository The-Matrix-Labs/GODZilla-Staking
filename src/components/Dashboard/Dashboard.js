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
import Values from "../../contract/value.json";
import { stackingabi, tokenabi, erc20ABI } from "../../contract";

const Dashboard = () => {
  const theme = useTheme();
  const data_hover =
    "Note - By doing emergency withdraw you will not recieve any reward also extra fees will be deducted.";
  const [stackeStyle, setstackeStyle] = useState("stake-activeoption");
  const [unstakeStyle, setunstackeStyle] = useState("inactiveoption");

  const [box1_child_style, setbox1ChildStyle] = useState("box1-child");
  const [options_style, setoptionsStyle] = useState("options");
  const [activeID, setActiveId] = useState(0);
  const [value, setValue] = React.useState(0);
  const [copyActionButtonStyle, setCopyActionButtonStyle] =
    useState("copyActionButton");
  const [text, setText] = React.useState(Values.tokenaddress);

  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();
  console.log(signer);

  const [setstackamount, setStackamount] = useState(0);

  const [poolId, setPoolId] = useState([10]);
  const [poolInfo, setPoolInfo] = useState();
  const [userInfo, setUserInfo] = useState();
  const [walletAddressInfo, setWalletAddressInfo] = useState();
  const [mystakebalance, setMystakeBalance] = useState(0);
  const [amount, setAmount] = useState();
  const [myaddress, setMyaddress] = useState();
  const [locktime, setLockTime] = useState(0);
  const [unlockTime, setUnlockTime] = useState(1);
  const [emergencyfee, setEmergencyfee] = useState();
  const [poolsize, setPoolSize] = useState();
  const [maxpool, setMaxPool] = useState(0);

  const [maxpoolunstaked, setMaxPoolunstaked] = useState(0);

  const [reward, setReward] = useState();
  const [myTokenBalance, setMyTokenBalance] = useState(0);
  const [istokenapproved, settokenapproved] = useState(false);
  const [buttonactive1, setButtonactive1] = useState("activebutton");
  const [buttonactive2, setButtonactive2] = useState(false);
  const [buttonactive3, setButtonactive3] = useState("");
  const [buttonactive4, setButtonactive4] = useState("");
  const [maxtoken, setMaxToken] = useState(0);
  const [maxContribution, setMaxContribution] = useState(0);
  const [minContribution, setMinContribution] = useState(0);
  const [claimableTokens, setClaimableTokens] = useState(0);
  const [rewardblock, setLastrewardBlock] = useState(0);
  const [totalstaked, setTotalTokensStaked] = useState(0);
  const [perblock, setPerblockNumber] = useState(0);
  const [errors, setError] = useState();
  const [block, setCurrentblock] = useState(0);
  const [currencyID, setCurrencyID] = React.useState("0");
  const currencyList = ["GODZ", "GODZlp"];
  const [optionState, setOptionState] = useState("0");
  const [bgColor, setBGColor] = useState("sliderBg");
  const [hoverColor, setHoverColor] = useState("sliderHover");
  const [sliderOptionsStyle, setSliderOptionsStyle] = useState({
    0: "",
    1: "slider_custom_options-child " + hoverColor,
    2: "slider_custom_options-child " + hoverColor,
    3: "slider_custom_options-child " + hoverColor,
    4: "slider_custom_options-child " + hoverColor,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopyActionButtonStyle("copyActionButton-active");
    setTimeout(() => {
      setCopyActionButtonStyle("copyActionButton");
    }, 1000);
    console.log("Copied to clipboard");
  };

  useEffect(() => {
    setSliderOptionsStyle({
      0: "",
      1: "slider_custom_options-child " + hoverColor,
      2: "slider_custom_options-child " + hoverColor,
      3: "slider_custom_options-child " + hoverColor,
      4: "slider_custom_options-child " + hoverColor,
    });
    setValue(0);
  }, [optionState]);

  useEffect(() => {
    sliderOptionsStyle[activeID] = "slider_custom_options-child " + hoverColor;
    setActiveId(value / 25);
    console.log(value);
    sliderOptionsStyle[value / 25] =
      "slider_custom_options-child-active " + bgColor;
    if (maxpoolunstaked !== 0 && buttonactive2 === true)
      setStackamount((value * maxpoolunstaked) / 100);
    else if (walletAddressInfo)
      setStackamount((value * walletAddressInfo) / 100);
    else setStackamount(0);
  }, [value]);

  const handlestake = () => {
    setstackeStyle("stake-activeoption");
    setunstackeStyle("inactiveoption");
    setoptionsStyle("options");
    setButtonactive2(false);
    setOptionState(0);
    setBGColor("");
    setHoverColor("");
  };

  const handleunstake = async () => {
    setstackeStyle("inactiveoption");
    setunstackeStyle("unstake-activeoption");
    setButtonactive2(true);
    setoptionsStyle("options red_border");
    setOptionState(1);
    setBGColor("sliderBg-red");
    setHoverColor("sliderHover-red");

    let rpcUrl = Values.rpcURl;
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let stake_temp = new ethers.Contract(
      Values.tokenaddress,
      tokenabi,
      provider_
    );
    var _poolInfo = await stake_temp.pool();
    setMaxPoolunstaked(await _poolInfo.totalTokensStaked.toString());
  };

  const handleup = () => {
    setCurrencyID((currencyID + 1) % currencyList.length);
  };
  const handledown = () => {
    setCurrencyID((currencyID - 1 + currencyList.length) % currencyList.length);
  };

  const handleSliderChange = (val) => {
    setValue(val);
  };

  useEffect(() => {
    getPoolInfo();
    getbalance();
    //console.log(sliderOptionsStyle);
  }, [sliderOptionsStyle]);

  async function getPoolInfo() {
    try {
      let rpcUrl = Values.rpcURl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let stake_temp = new ethers.Contract(
        Values.tokenaddress,
        tokenabi,
        provider_
      );
      var _poolInfo = await stake_temp.pool();
      console.log("Func", stake_temp);
      setMaxPool(await _poolInfo.poolRemainingSupply.toString());
      setLockTime(await _poolInfo.stakeTimeLockSec.toString());
      setLastrewardBlock(await _poolInfo.lastRewardBlock.toString());
      setTotalTokensStaked(await _poolInfo.totalTokensStaked.toString());
      setUnlockTime(await _poolInfo.lockedUntilDate.toString());
      setMinContribution(await _poolInfo.accERC20PerShare.toString());
      setMaxContribution(await _poolInfo.stakeTimeLockSec.toString());
      setPerblockNumber(await _poolInfo.perBlockNum.toString());

      console.log("pool Info", _poolInfo);

      let block = await stake_temp.getLastStakableBlock();
      setCurrentblock(block.toString());

      let raww = await stake_temp.getLockedUntilDate();
      console.log("Valueee---", raww.toString());

      // console.log("Emergency Fees: ", _poolInfo.emergencyFees.toString());
      // const emergencywithdrawfee = await _poolInfo.emergencyFees.toString();
      // const currrentpoolsize = await _poolInfo.currentPoolSize.toString();

      // const maxcontribution = await _poolInfo.maxContribution.toString();
      // const maxcontributionconverted =
      //   ethers.utils.formatEther(maxcontribution);
      // const minicontribution = await _poolInfo.minContribution.toString();
      // const minicontributionconverted =
      //   ethers.utils.formatEther(minicontribution);
      // const currrentpoolsizeConverted = Math.floor(
      //   ethers.utils.formatEther(currrentpoolsize)
      // );
      // const maxpool = await _poolInfo.maxPoolSize.toString();
      // const maxpoolConverted = ethers.utils.formatEther(maxpool);
      // const lockDayss = await _poolInfo.lockDays.toString();
      // setPoolInfo(_poolInfo);
      // setMinContribution(minicontributionconverted);
      // setEmergencyfee(emergencywithdrawfee);
      // setPoolSize(currrentpoolsizeConverted);
      // setMaxContribution(maxcontributionconverted);
      // console.log("current pools=>" + currrentpoolsizeConverted);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getbalance() {
    let rpcUrl = Values.rpcURl;
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let stake_temp = new ethers.Contract(
      Values.tokenaddress,
      tokenabi,
      provider_
    );
    let balance = await stake_temp.balanceOf(signer.getAddress());
    setWalletAddressInfo(balance.toString());
  }

  async function emergencywithdraw() {
    try {
      const stakeContract = new ethers.Contract(
        Values.tokenaddress,
        tokenabi,
        signer
      );
      let stackfunction = await stakeContract.emergencyUnstake();
      await stackfunction.wait();
    } catch (stakeContract) {
      alert(stakeContract.reason);
    }
  }

  const Startswap = async () => {
    try {
      await approve(setstackamount);
      /*Stacking function start from here */
      const stakeContract = new ethers.Contract(
        Values.stackingaddress,
        tokenabi,
        signer
      );
      let stackfunction = await stakeContract.stakeTokens(
        setstackamount.toString(),
        ["1"]
      );
      await stackfunction.wait();
      getPoolInfo();
      alert("Stacking Succesfully");
    } catch (stakeContract) {
      alert(stakeContract.reason);
    }
  };

  const approve = async (setstackamount) => {
    if (setstackamount !== 0) {
      try {
        const erc20Contract = new ethers.Contract(
          Values.tokenaddress,
          erc20ABI,
          signer
        );
        let stakeapproval = await erc20Contract.approve(
          Values.stackingaddress,
          setstackamount.toString()
        );
        return stakeapproval;
      } catch (stakeContract) {
        alert(stakeContract.reason);
      }
    } else {
      alert("Please choose the Stacking amount greater than 0");
      return false;
    }
  };

  const UnStartswap = async () => {
    try {
      const stakeContract = new ethers.Contract(
        Values.tokenaddress,
        tokenabi,
        signer
      );
      let _amount = ethers.utils.parseEther(setstackamount.toString());
      let stackfunction = await stakeContract.unstakeTokens(_amount, false);
      await stackfunction.wait();
      getPoolInfo();
      alert("Stacking Succesfully");
    } catch (stakeContract) {
      alert(stakeContract.reason);
    }
  };

  return (
    <div class="dashboard-root">
      <div class="title">GODZilla Staking Program</div>

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
          <button class={copyActionButtonStyle} onClick={handleCopy}>
            <ContentCopy />
          </button>
        </div>
      </div>
      <div className="flex-container">
        <div class="container">
          <div class="modal">
            <div class={options_style}>
              <button class={stackeStyle} onClick={handlestake}>
                Stake
              </button>
              <button class={unstakeStyle} onClick={handleunstake}>
                Unstake
              </button>
            </div>
            <div class="info">
              <div class="info-child-left">
                Staking Period: {locktime} Seconds
              </div>
              <div class="info-child-right">
                Interest Rate: {minContribution} PR
              </div>
            </div>
            <div>
              <input
                type="text"
                class="amount"
                onChange={(e) => setStackamount(e.target.value)}
                placeholder="Enter amount (GODZ)"
              ></input>
            </div>

            <Slider
              aria-label="Volume"
              defaultValue={0}
              value={value}
              step={25}
              onChange={(event, val) => {
                handleSliderChange(val);
              }}
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
                  setValue(25);
                }}
              >
                25%
              </button>
              <button
                class={sliderOptionsStyle[2]}
                onClick={() => {
                  setValue(50);
                }}
              >
                50%
              </button>
              <button
                class={sliderOptionsStyle[3]}
                onClick={() => {
                  setValue(75);
                }}
              >
                75%
              </button>
              <button
                class={sliderOptionsStyle[4]}
                onClick={() => {
                  setValue(100);
                }}
              >
                100%
              </button>
            </div>
            {maxpoolunstaked !== 0 && buttonactive2 === true ? (
              <div class="info2">
                <div class="info-child2-left">Available</div>
                <div class="info-child2-right">{maxpoolunstaked || 0} GODZ</div>
              </div>
            ) : (
              <div class="info2">
                <div class="info-child2-left">Available</div>
                <div class="info-child2-right">
                  {walletAddressInfo || 0} GODZ
                </div>
              </div>
            )}

            <div class="action">
              {!signer ? (
                <ConnectButton class={"actions-child " + hoverColor} />
              ) : signer && buttonactive2 === true ? (
                <button
                  class={"actions-child " + hoverColor}
                  onClick={UnStartswap}
                >
                  {" "}
                  Un Stake token for {setstackamount}
                </button>
              ) : (
                <button
                  class={"actions-child " + hoverColor}
                  onClick={Startswap}
                >
                  {" "}
                  Stake token for {setstackamount}
                </button>
              )}
            </div>
            <div class="action2">
              <button class="actions-child2" onClick={emergencywithdraw}>
                {" "}
                Emergency Withdraw
              </button>
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
              <div class="box3-title-content">{totalstaked} GODZ staked</div>
            </div>
            <div class="inner2">
              <div class="d3">
                <h4 class="d3-child">9.02% APR</h4>
              </div>
              <div class="d4">
                <div class="stats-values">({perblock} GODZ/block)</div>
                <div class="stats-values">{totalstaked} GODZ staked</div>
              </div>
            </div>
            <div class="footers">Reward</div>
            <hr class="hr" />
            <div class="d3">
              <h4 class="d3-child">Block: {rewardblock}</h4>
            </div>
            <div class="d4">
              <div class="stats-values">[ est {unlockTime} ]</div>
            </div>
            <div class="footers">Expiration: {unlockTime} Seconds</div>
            <hr class="hr" />
            <div class="footers">EARNED</div>
            <div class="dashed_line">
              <hr class="dashed_line-child"></hr>
              <hr class="dashed_line-child"></hr>
              <hr class="dashed_line-child"></hr>
              <hr class="dashed_line-child"></hr>
              <hr class="dashed_line-child"></hr>
            </div>
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
