class AddCountersToQuestionsTable < ActiveRecord::Migration[7.1]
  def change
    add_column :questions, :like_count, :integer, default: 0
    add_column :questions, :dislike_count, :integer, default: 0
  end
end
