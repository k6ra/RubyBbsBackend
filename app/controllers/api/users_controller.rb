module Api
    class UsersController < ApplicationController

        def find
            User.find(params[:id])
        end

        def getAll
            @users = User.all
            render json: @users
        end
        
        def entry
            @user = User.new(user_params)
            @user.save
        end

        def update
            User.update_attributes(user_params)
        end

        def delete
            User.find(params[:id]).destroy
        end

        private

            def user_params
                params.require(:user).permit(:loginname, :password)
            end
    end
end