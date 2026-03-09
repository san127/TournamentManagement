import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Plus, Trash2 } from 'lucide-react';

export function TournamentCreationWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    description: '',
    format: 'single-elimination',
    teamBased: false,
    maxParticipants: 64,
    registrationOpen: '',
    registrationClose: '',
    checkinTime: '',
    startTime: '',
    prizes: [
      { place: '1st', amount: '' },
      { place: '2nd', amount: '' },
      { place: '3rd', amount: '' },
    ]
  });

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Format' },
    { number: 3, title: 'Schedule' },
    { number: 4, title: 'Prize Pool' },
  ];

  const games = ['League of Legends', 'Valorant', 'Counter-Strike 2', 'Dota 2', 'Rocket League', 'Overwatch 2'];
  const formats = [
    { value: 'single-elimination', label: 'Single Elimination', description: 'Players are eliminated after one loss' },
    { value: 'double-elimination', label: 'Double Elimination', description: 'Players need two losses to be eliminated' },
    { value: 'round-robin', label: 'Round Robin', description: 'All players play against each other' },
  ];
  const participantOptions = [8, 16, 32, 64, 128, 256];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Creating tournament:', formData);
    navigate('/app/organizer');
  };

  const addPrize = () => {
    setFormData({
      ...formData,
      prizes: [...formData.prizes, { place: `${formData.prizes.length + 1}th`, amount: '' }]
    });
  };

  const removePrize = (index: number) => {
    setFormData({
      ...formData,
      prizes: formData.prizes.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Tournament</h1>
        <p className="text-muted-foreground">Follow the steps to set up your tournament</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step > s.number ? 'bg-success text-white' :
                  step === s.number ? 'bg-primary text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                </div>
                <p className="text-sm mt-2">{s.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 ${
                  step > s.number ? 'bg-success' : 'bg-muted'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold mb-4">Basic Information</h2>
            <div>
              <label className="block mb-2">Tournament Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Spring Championship 2026"
              />
            </div>
            <div>
              <label className="block mb-2">Game</label>
              <select
                value={formData.game}
                onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a game</option>
                {games.map((game) => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                rows={4}
                placeholder="Describe your tournament..."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold mb-4">Tournament Format</h2>
            <div>
              <label className="block mb-2">Format</label>
              <div className="space-y-3">
                {formats.map((format) => (
                  <label
                    key={format.value}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.format === format.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={format.value}
                      checked={formData.format === format.value}
                      onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-semibold">{format.label}</p>
                      <p className="text-sm text-muted-foreground">{format.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="teamBased"
                checked={formData.teamBased}
                onChange={(e) => setFormData({ ...formData, teamBased: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="teamBased">Team-based tournament</label>
            </div>
            <div>
              <label className="block mb-2">Max Participants</label>
              <div className="grid grid-cols-3 gap-3">
                {participantOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({ ...formData, maxParticipants: option })}
                    className={`px-4 py-3 rounded-lg border transition-colors ${
                      formData.maxParticipants === option
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-bold mb-4">Schedule</h2>
            <div>
              <label className="block mb-2">Registration Open</label>
              <input
                type="datetime-local"
                value={formData.registrationOpen}
                onChange={(e) => setFormData({ ...formData, registrationOpen: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block mb-2">Registration Close</label>
              <input
                type="datetime-local"
                value={formData.registrationClose}
                onChange={(e) => setFormData({ ...formData, registrationClose: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block mb-2">Check-in Time</label>
              <input
                type="datetime-local"
                value={formData.checkinTime}
                onChange={(e) => setFormData({ ...formData, checkinTime: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block mb-2">Tournament Start Time</label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">Prize Pool</h2>
              <button
                onClick={addPrize}
                className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Prize
              </button>
            </div>
            <div className="space-y-3">
              {formData.prizes.map((prize, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={prize.place}
                    onChange={(e) => {
                      const newPrizes = [...formData.prizes];
                      newPrizes[index].place = e.target.value;
                      setFormData({ ...formData, prizes: newPrizes });
                    }}
                    className="w-32 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="1st"
                  />
                  <input
                    type="text"
                    value={prize.amount}
                    onChange={(e) => {
                      const newPrizes = [...formData.prizes];
                      newPrizes[index].amount = e.target.value;
                      setFormData({ ...formData, prizes: newPrizes });
                    }}
                    className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="$10,000"
                  />
                  {formData.prizes.length > 1 && (
                    <button
                      onClick={() => removePrize(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="px-6 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-success text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Create Tournament
          </button>
        )}
      </div>
    </div>
  );
}
