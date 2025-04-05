import User from "../model/user.model.js"; // adjust the path if different

// Controller to get user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select("-password"); // exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
