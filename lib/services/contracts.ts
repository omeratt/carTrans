import Contract from "Models/Contract";
import User from "Models/User";
import { ContractState } from "store/slices/userSlice";

export interface CreateContractProps {
  carBrand?: string;
  expires?: Date;
  to?: string;
}
export async function createContract(
  _id: string,
  contract: CreateContractProps
) {
  try {
    const { to: toUserEmail, ...restContract } = contract;
    if (!restContract.carBrand) throw new Error("Car Brand Is Required");
    if (!restContract.expires) throw new Error("Expiration Date Is Required");
    if (!toUserEmail) throw new Error("Buyer's Email Is Required");
    const toEmail = toUserEmail.toLowerCase();

    const to = await User.findOne({ email: toEmail });
    if (!to) throw new Error("User Not Found!");

    const from = await User.findOne({ _id });
    if (!from) throw new Error("user not Logged in!");
    const createdContract = await new Contract({
      ...restContract,
      to,
      from,
    });
    await createdContract.save();
    return createdContract;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
export async function getContract(_id: string) {
  try {
    const myContracts = await Contract.find({
      $or: [
        {
          from: _id,
        },
        {
          to: _id,
        },
      ],
    });

    return myContracts;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
