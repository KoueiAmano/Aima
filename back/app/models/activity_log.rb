class ActivityLog < ApplicationRecord
  enum :mood,      { energetic: 0, neutral: 1, calm: 2 }
  enum :feedback,  { good: 0, normal: 1, bad: 2 }
  enum :weather,   { sunny: 0, cloudy: 1, rainy: 2 }

  before_validation :set_defaults, on: :create
  
  validates :mood, presence: true
  validates :feedback, presence: true
  validates :weather, presence: true
  validates :duration_min, presence: true

  belongs_to :user
  belongs_to :recipe
  
  private

  def set_defaults
    self.feedback ||= :normal
  end
end
