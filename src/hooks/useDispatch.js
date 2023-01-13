import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useCustomDispatch = (type, onSuccess) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: type, onSuccess: onSuccess });
  }, []);
};

export default useCustomDispatch;
