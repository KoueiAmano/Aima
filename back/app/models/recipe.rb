class Recipe < ApplicationRecord
        enum :category, { relax: 0, focus: 1, outdoor: 2, reflect: 3, play: 4 }

        validates :title, presence: true
        validates :category, presence: true
        validates :description, presence: true

        has_many :activity_logs
end
