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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const theme = useTheme();
  const data_hover =
    "Note - By doing emergency withdraw you will not receive any accrued reward";
  const [stackeStyle, setstackeStyle] = useState("stake-activeoption");
  const [unstakeStyle, setunstackeStyle] = useState("inactiveoption");

  const [box1_child_style, setbox1ChildStyle] = useState("box1-child");
  const [options_style, setoptionsStyle] = useState("options");
  const [activeID, setActiveId] = useState(0);
  const [value, setValue] = React.useState(0);
  const [copyActionButtonStyle, setCopyActionButtonStyle] =
    useState("copyActionButton");
  const [text, setText] = React.useState(Values.stackingaddress);
  const [tokenaddr, setTokenaddr] = useState(Values.tokenaddress);
  const { data: signer, isError, isLoading } = useSigner();
  const provider = useProvider();
  console.log(signer);

  const [setstackamount, setStackamount] = useState(0);
  const [unstakeState, setUnstakeState] = useState(false);
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
  const [rewards, setRewards] = useState(0);
  const [maxpoolunstaked, setMaxPoolunstaked] = useState(0);
  const [stakedBal, setStakedBal] = useState(0);
  const [reward, setReward] = useState();
  const [apy, setApy] = useState(0);
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
  const currencyList = ["GODZ", "GODZ LP"];
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
  }, [value, unstakeState]);

  const handlestake = () => {
    setstackeStyle("stake-activeoption");
    setunstackeStyle("inactiveoption");
    setoptionsStyle("options");
    setButtonactive2(false);
    setOptionState(0);
    setBGColor("");
    setHoverColor("");
    setUnstakeState(false);
  };

  const handleunstake = async () => {
    setstackeStyle("inactiveoption");
    setunstackeStyle("unstake-activeoption");
    setButtonactive2(true);
    setoptionsStyle("options red_border");
    setOptionState(1);
    setBGColor("sliderBg-red");
    setHoverColor("sliderHover-red");
    setUnstakeState(true);
    let rpcUrl = Values.rpcURl;
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let stake_temp = new ethers.Contract(
      text,
      tokenabi,
      provider_
    );
    if (tokenaddr === Values.tokenaddress) {
    var stakerBal = await stake_temp.stakers(signer.getAddress());
      setMaxPoolunstaked ((stakerBal.amountStaked / 10 ** 9).toFixed(2));
    } else if (tokenaddr === Values.godzlptoken) {
      var stakerBal = await stake_temp.stakers(signer.getAddress());
      setMaxPoolunstaked(Math.round(stakerBal.amountStaked / 10 ** 18));
    }
  };

  const handleup = () => {
    setCurrencyID((currencyID + 1) % currencyList.length)
    let curID = currencyID.toString();
    if (curID === "1") {
      setText(Values.stackingaddress);
      setTokenaddr(Values.tokenaddress);
    } else if (curID === "0") {
      setText(Values.godzlpaddress);
      setTokenaddr(Values.godzlptoken);
    }
  };
  const handledown = () => {
    setCurrencyID((currencyID - 1 + currencyList.length) % currencyList.length);
    let curID = currencyID.toString();
    if (curID === "1") {
      setText(Values.stackingaddress);
      setTokenaddr(Values.tokenaddress);
    } else if (curID === "0") {
      setText(Values.godzlpaddress);
      setTokenaddr(Values.godzlptoken);
    }
  };

  const handleSliderChange = (val) => {
    setValue(val);
  };

  useEffect(() => {
    getPoolInfo();
    getbalance();
    getApy();
    //console.log(sliderOptionsStyle);
  }, [text, locktime, signer]);

  async function getPoolInfo() {
    try {
      let rpcUrl = Values.rpcURl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let stake_temp = new ethers.Contract(
        text,
        tokenabi,
        provider_
      );
      var _poolInfo = await stake_temp.pool();
      console.log("Func", stake_temp);
      console.log ("poolInfo", _poolInfo);
      setMaxPool(await _poolInfo.poolRemainingSupply.toString());
      const locktimeseconds = await _poolInfo.stakeTimeLockSec / 86400;
      setLockTime(locktimeseconds.toString());
      setLastrewardBlock(await _poolInfo.lastRewardBlock.toString());
      setUnlockTime(await _poolInfo.lockedUntilDate.toString());
      setMinContribution(await _poolInfo.accERC20PerShare.toString());
      setMaxContribution(await _poolInfo.stakeTimeLockSec.toString());

      console.log("pool Info", _poolInfo);

      let block = await stake_temp.getLastStakableBlock();
      setCurrentblock(block.toString());

      let raww = await stake_temp.getLockedUntilDate();
      console.log("Valueee---", raww.toString());
      
      if (tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7") {
      var stakerBal = await stake_temp.stakers(signer.getAddress());
      console.log ("stakerBal", ethers.utils.formatEther(stakerBal.amountStaked.toString()));
      setStakedBal((stakerBal.amountStaked / 10 ** 9).toFixed(2).toString());
      setTotalTokensStaked ((await _poolInfo.totalTokensStaked / 10 ** 9).toFixed(2).toString());      
      setPerblockNumber ((await _poolInfo.perBlockNum / 10 ** 9).toFixed(2).toString());
      var rewards = await stake_temp.calcHarvestTot(signer.getAddress());
      setRewards(Math.round(rewards / 10 ** 9));
      } else {
        var stakerBal = await stake_temp.stakers(signer.getAddress());
        setStakedBal((stakerBal.amountStaked / 10 ** 18).toFixed(2).toString());
        setTotalTokensStaked (Math.round(ethers.utils.formatEther(await _poolInfo.totalTokensStaked.toString())));
        setPerblockNumber (Math.round(ethers.utils.formatEther(await _poolInfo.perBlockNum.toString())));  
        var rewards = await stake_temp.calcHarvestTot(signer.getAddress());
        setRewards(Math.round(rewards.toString()));
      }

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

  async function getApy() {
    if (tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7") {
    try {
      let rpcUrl = Values.rpcURl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let stake_temp = new ethers.Contract(
        text,
        tokenabi,
        provider_
      );
      var _poolInfo = await stake_temp.pool();
      const blockperday = 86400 / 3;
      const totaltokensstaked = (Math.round(await _poolInfo.totalTokensStaked / 10 ** 9).toString());
      const perblocknumber = (Math.round(await _poolInfo.perBlockNum / 10 ** 9).toString());
      const totaltokensstakedconverted = ethers.utils.formatEther(
        totaltokensstaked
      );
      const perblocknumberconverted = ethers.utils.formatEther(perblocknumber);
      const apy = (((perblocknumberconverted * blockperday) / totaltokensstakedconverted) * 365).toFixed(2);
      setApy(apy);
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
      let rpcUrl = Values.rpcURl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let stake_temp = new ethers.Contract(
        text,
        tokenabi,
        provider_
      );
      var _poolInfo = await stake_temp.pool();
      const blockperday = 86400 / 3;
      const totaltokensstaked = (ethers.utils.formatEther(await _poolInfo.totalTokensStaked)).toString();
      const perblocknumber = (ethers.utils.formatEther(await _poolInfo.perBlockNum)).toString();
      const apy = (((perblocknumber * blockperday) / totaltokensstaked) * 365).toFixed(2);
      setApy(apy);
    } catch (err) {
      console.log(err.message);
    }
  }
  }

  async function getbalance() {
    if (tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7"){
    try {
    let rpcUrl = Values.rpcURl;
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let stake_temp = new ethers.Contract(
      tokenaddr,
      erc20ABI,
      provider_
    );
    let balance = await stake_temp.balanceOf(signer.getAddress());
    let balanceconverted = (balance / 10 ** 9).toFixed(2).toString();
    setWalletAddressInfo(balanceconverted.toString());
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
    let rpcUrl = Values.rpcURl;
    let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
    let stake_temp = new ethers.Contract(
      tokenaddr,
      erc20ABI,
      provider_
    );
    let balance = await stake_temp.balanceOf(signer.getAddress());
    let balanceconverted = Math.round(ethers.utils.formatEther(balance));
    setWalletAddressInfo(balanceconverted.toString());
    } catch (err) {
      console.log(err.message);
    }
  }
  }

  async function emergencywithdraw() {
    try {
      const stakeContract = new ethers.Contract(
        text,
        tokenabi,
        signer
      );
      let stackfunction = await stakeContract.emergencyUnstake();
      await stackfunction.wait();
    } catch (stakeContract) {
      toast.error (stakeContract.reason);
    }
  }

  const Startswap = async () => {
    if (setstackamount === 0 || setstackamount === "0" || setstackamount === "") {
       toast.error("Please enter amount");
    } else if ( tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7" ) {
       try {
      const stakeContract = new ethers.Contract(
        text,
        tokenabi,
        signer
      );
      let stackfunction = await stakeContract.stakeTokens(
        (setstackamount - 1) * 10 ** 9,
        ["1"]
      );
      await stackfunction.wait();
      getPoolInfo();
      toast.success("Staking Successfully");
    } catch (stakeContract) {
      console.log (stakeContract.reason);
      if (stakeContract.reason === "execution reverted: ERC20: transfer amount exceeds balance") {
        toast.error("Insufficient Balance");
      } else if (
        stakeContract.reason === "execution reverted: ERC20: transfer amount exceeds allowance"
      ) {
        toast.error("Please Approve Token");
        approve(setstackamount);
      } else {
        toast.error(stakeContract.reason);
      }
    }
  } else {
    try {
      const stakeContract = new ethers.Contract(
        text,
        tokenabi,
        signer
      );
      let stackfunction = await stakeContract.stakeTokens(
        ethers.utils.parseEther(setstackamount),
        ["1"]
      );
      console.log (stackfunction);
      await stackfunction.wait();
      getPoolInfo();
      toast.success("Staking Successfully");
    } catch (stakeContract) {
      console.log (stakeContract.reason);
      if (stakeContract.reason === "execution reverted: ERC20: transfer amount exceeds balance" || stakeContract.reason === "execution reverted: ds-math-sub-underflow") {
        toast.error("Insufficient Balance");
      } else if (
        stakeContract.reason === "execution reverted: ERC20: transfer amount exceeds allowance"
      ) {
        toast.error("Please Approve Token");
        approve(setstackamount);
      } else {
        toast.error(stakeContract.reason);
      }
    }
  }
  };

  const approve = async (setstackamount) => {
    if (tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7") {
      try {
        const erc20Contract = new ethers.Contract(
          tokenaddr,
          erc20ABI,
          signer
        );     
        let stakeapproval = await erc20Contract.approve(
          text,
          setstackamount * 10 ** 9
        );
        await stakeapproval.wait();
        toast.success("Approved");
        Startswap();
        } catch (stakeapproval) {
          toast.error(stakeapproval.reason);
        }
      } else {
        try {
          const erc20Contract = new ethers.Contract(
            tokenaddr,
            erc20ABI,
            signer
          ); 
        let stakeapproval = await erc20Contract.approve(
          text,
          ethers.utils.parseEther(setstackamount)
        );
        await stakeapproval.wait();
        toast.success("Approved");
        Startswap();
      } catch (stakeContract) {
        toast.error(stakeContract.reason);
      }
    }
  };

  const UnStartswap = async () => {
    if (setstackamount === 0 || setstackamount === "0" || setstackamount === "") {
      toast.error("Please enter amount");
    } else if ( tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7" ) {
    try {
      const stakeContract = new ethers.Contract(
        text,
        tokenabi,
        signer
      );
      let stackfunction = await stakeContract.unstakeTokens((setstackamount - 1) * 10 ** 9, false);
      await stackfunction.wait();
      getPoolInfo();
      toast.success("Unstaking Successfully");
    } catch (stakeContract) {
      toast.error(stakeContract.reason);
    }
  } else {
    try {
      const stakeContract = new ethers.Contract(
        text,
        tokenabi,
        signer
      );
      let stackfunction = await stakeContract.unstakeTokens(ethers.utils.parseEther(setstackamount), false);
      await stackfunction.wait();
      getPoolInfo();
      toast.success("Unstaking Successfully");
    } catch (stakeContract) {
      toast.error(stakeContract.reason);
    }
  }
  }

  return (
    <div class="dashboard-root">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
       />
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
                Staking Period: {locktime} Days
              </div>
              <div class="info-child-right">
                Interest Rate: {apy}%
              </div>
            </div>
            <div>
              <input
                type="text"
                class="amount"
                value={setstackamount}
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
              { unstakeState === false ? (
              <div class="info2">
                <div class="info-child2-left">Available</div>
                { tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7"
                ? (
                <div class="info-child2-right">
                  {walletAddressInfo || 0} GODZ
                </div>
                ) : (
                <div class="info-child2-right">
                  {walletAddressInfo || 0} GODZ LP
                </div>
                )}
              </div>
              ) : (
                <div class="info2">
                <div class="info-child2-left">Available</div>
                { tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7"
                ? (
                <div class="info-child2-right">
                  {maxpoolunstaked || 0} GODZ
                </div>
                ) : (
                <div class="info-child2-right">
                  {maxpoolunstaked || 0} GODZ LP
                </div>
                )}
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
              { tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7"
                ? (
              <div class="box3-title-content">{stakedBal} GODZ staked</div>  ) : (
                <div class="box3-title-content">{stakedBal} GODZ LP staked</div>
              )}
            </div>
            <div class="inner2">
              <div class="d3">
                <h4 class="d3-child">{apy}% APR</h4>
              </div>
              { tokenaddr === "0xAe7Cf30E14E132E43689eBE4FAb49706c59A0bf7"
                ? (
              <div class="d4">
                <div class="stats-values">({perblock} GODZ/block)</div>
                <div class="stats-values">{totalstaked} GODZ staked</div>
              </div>
              ) : (
                <div class="d4">
                <div class="stats-values">({perblock} GODZ LP/block)</div>
                <div class="stats-values">{totalstaked} GODZ LP staked</div>
                </div>
              )}
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
            <div class="footers">EARNED :{rewards}</div>
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
