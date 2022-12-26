import User, { UserType } from "Models/User";

export async function getUsers() {
  try {
    const users = await User.find();
    return { users };
  } catch (error: any) {
    return { error };
  }
}

export async function createUser(user: any) {
  try {
    if (!user.email) throw new Error("Email Is Required");
    const email = user.email.toLowerCase();
    console.log(user);
    const found = await User.findOne({ email });
    console.log(found);
    if (found) throw new Error("Email Already Exist");
    const createdUser: UserType = await new User({
      ...user,
      email,
    });
    console.log("sec");
    await createdUser.save();
    return createdUser;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

export async function getUserById(id: string) {
  try {
    const user: UserType | null = await User.findById(id);
    return user;
  } catch (error: any) {
    return { error };
  }
}
export const getUserByEmail = async (
  emailAddress: string,
  password: boolean = false
): Promise<UserType> => {
  let user;
  const email = emailAddress.toLowerCase().trim();
  try {
    if (password) {
      user = await User.findOne({
        email,
      }).select("+password");
      // .populate(["tasks"]);
    } else {
      user = await User.findOne({
        email,
      });
      // .populate(["tasks"]);
    }
    return user as UserType;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
