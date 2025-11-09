function LogList({ logs, onDeleteLog }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (logs.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-black mb-4">Previous Logs</h2>
        <p className="text-gray-500 text-center">No logs yet. Start logging your productivity!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-black mb-4">Previous Logs</h2>
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600">{formatDate(log.timestamp)}</span>
              <button
                onClick={() => onDeleteLog(log.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>
            </div>
            <p className="text-black whitespace-pre-wrap">{log.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogList;
