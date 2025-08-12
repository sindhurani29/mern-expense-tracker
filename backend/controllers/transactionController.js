import Transaction from '../models/Transaction.js';

export const listTransactions = async (req, res) => {
  try {
    const tsn = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(tsn);
  } catch (err) { 
    res.status(500).json({ message: 'Server error' }); 
  }
}

export const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const created = await Transaction.create({ 
                                               userId: req.user._id, 
                                               title, 
                                               amount, 
                                               type, 
                                               category, 
                                               date 
                                            });
    res.status(201).json(created);
  } catch (err) { 
    res.status(500).json({ message: 'Server error' });
  }
}

export const updateTransaction = async (req, res) => {
  try {
    const tsn = await Transaction.findOneAndUpdate({ 
                                                    _id: req.params.id, 
                                                    userId: req.user._id 
                                                },  req.body, { new: true });
    if (!tsn) return res.status(404).json({ message: 'Not found' });
    res.json(tsn);
  } catch (err) { 
    res.status(500).json({ message: 'Server error' });
  }
 }

export const deleteTransaction = async (req, res) => {
  try {
    const tsn = await Transaction.findOneAndDelete({ 
                                                    _id: req.params.id, 
                                                    userId: req.user._id 
                                                });
    if (!tsn) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) { 
    res.status(500).json({ message: 'Server error' });
  }
}
