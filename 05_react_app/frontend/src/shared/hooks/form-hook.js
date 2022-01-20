import { useCallback, useReducer } from "react";

const INPUT_CHANGE = "INPUT_CHANGE";

const formReducer = (state, action) => {
  console.log(action.type);
  console.log(action);
  switch (action.type) {
    case INPUT_CHANGE: {
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }

    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  console.log("useForm", formState);

  // no dependency means run only first time rendering
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: INPUT_CHANGE, value, inputId: id, isValid });
  }, []);

  return [formState, inputHandler];
};
