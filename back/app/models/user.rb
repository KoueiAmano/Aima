class User < ApplicationRecord
    enum :personality, { energetic: 0, neutral: 1, calm: 2 }
    enum :preference,  { outdoor: 0, both: 1, indoor: 2 }

    before_validation :set_defaults, on: :create

    validates :personality, presence: true
    validates :preference, presence: true

    has_many :activity_logs, dependent: :destroy

    private

    def set_defaults
        self.name ||= "guest"
        self.personality ||= :neutral
        self.preference  ||= :both
    end
end
