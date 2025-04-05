export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to access this resource" });
        }
        next();
    } catch (error) {
        console.error("Admin middleware error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};