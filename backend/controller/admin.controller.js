import User from "../model/user.model.js";
import UsageLog from "../model/UsageLog.model.js";

export const getAnalytics=async(req,res)=>{
    try {
        
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        
        
        const dailyScans = await UsageLog.aggregate([
          { 
            $match: { 
              actionType: 'scan',
              timestamp: { $gte: startDate, $lte: endDate }
            }
          },
          {
            $group: {
              _id: { 
                $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ]);
        
        
        const topUsers = await User.aggregate([
          { $sort: { totalScans: -1 } },
          { $limit: 10 },
          { 
            $project: { 
              username: 1, 
              email: 1,
              totalScans: 1,
              credits: 1
            }
          }
        ]);
        
       
        const totalUsers = await User.countDocuments();
        const totalScans = await UsageLog.countDocuments({ actionType: 'scan' });
        const todayScans = await UsageLog.countDocuments({
          actionType: 'scan',
          timestamp: { 
            $gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        });
        
        res.status(200).json({
          dailyScans,
          topUsers,
          stats: {
            totalUsers,
            totalScans,
            todayScans
          }
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}