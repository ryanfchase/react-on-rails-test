class Episode < ApplicationRecord
  belongs_to :section
  delegate :course, to: :section
end
