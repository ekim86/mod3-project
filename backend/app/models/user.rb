class User < ApplicationRecord
  has_many :photos

  validates :name, presence: true
  #we may need to include error message later

end
