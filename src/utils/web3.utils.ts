import { DeviceActionState, DeviceActionStatus, UserInteractionRequired } from "@ledgerhq/device-management-kit";

export async function getChainInfo(chainId) {
  try {
    const response = await fetch(`https://chainid.network/chains.json`);
    const chains = await response.json();
    const chain = chains.find((chain) => chain.chainId === chainId);
    return chain;
  } catch (error) {
    return;
  }
}

export function observableBehavior(observable): any {
  observable.subscribe({
    next: (state: DeviceActionState<any, any, any>) => {
      switch (state.status) {
        case DeviceActionStatus.NotStarted: {
          console.log("The action is not started yet.");
          break;
        }
        case DeviceActionStatus.Pending: {
          const {
            intermediateValue
          } = state;
          // Access the intermediate value here, explained below
          const { requiredUserInteraction } = intermediateValue;
 
          switch (requiredUserInteraction) {
            case UserInteractionRequired.SignPersonalMessage: {
              // User needs to sign the message displayed on the device
              console.log("User needs to sign the message displayed on the device.");
              break;
            }
            case UserInteractionRequired.SignTypedData: {
              // User needs to sign the typed data displayed on the device
              console.log("User needs to sign the typed data displayed on the device.");
              break;
            }
            case UserInteractionRequired.SignTransaction: {
              // User needs to sign the transaction displayed on the device
              console.log("User needs to sign the transaction displayed on the device.");
              break;
            }
            case UserInteractionRequired.VerifyAddress: {
              // User needs to verify the address displayed on the device
              console.log("User needs to verify the address displayed on the device.");
              break;
            }
            case UserInteractionRequired.None: {
              // No user action required
              console.log("No user action needed.");
              break;
            }
            case UserInteractionRequired.UnlockDevice: {
              // User needs to unlock the device
              console.log("The user needs to unlock the device.");
              break;
            }
            case UserInteractionRequired.ConfirmOpenApp: {
              // User needs to confirm on the device to open the app
              console.log("The user needs to confirm on the device to open the app.");
              break;
            }
            default:
              // Type guard to ensure all cases are handled
              const uncaughtUserInteraction = requiredUserInteraction;
              console.error("Unhandled user interaction case:", uncaughtUserInteraction);
          }
          break;
        }
        case DeviceActionStatus.Stopped: {
          console.log("The action has been stopped.");
          break;
        }
        case DeviceActionStatus.Completed: {
          const { output } = state;
          // Access the output of the completed action here
          return output;
        }
        case DeviceActionStatus.Error: {
          const { error } = state;
          // Access the error here if occurred
          console.log("An error occurred during the action: ", error);
          break;
        }
      }
    },
  });
}