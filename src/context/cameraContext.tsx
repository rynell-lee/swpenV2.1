import createDataContext from "./createDataContext";
import React, { useState } from "react";

const [test, setTest] = useState<Boolean>(true);

export const { Context, Provider } = createDataContext({ test, setTest });
